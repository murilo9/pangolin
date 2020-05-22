import { Entity } from "./Entity";
import { Tile } from "./Tile";
import { Room } from "./Room";
import tile1 from '../src/tiles/main.png';
import { GraphicEntity } from "./GraphicEntity";
import { PhysicEntity } from "./PhysicEntity";
import { Sprite } from "./Sprite";
import gameSets from '../src/main';

export interface IGameConfig {
  showCollisionBoxes: boolean
}

export class Game{

  private static _instance: Game;
  private static keyUpEvent: KeyboardEvent;
  private static keyDownEvent: KeyboardEvent;

  private pressedKeys: any;
  private gameCanvas: HTMLCanvasElement;
  private cachedTiles;
  private currentRoom: Room;
  private config: IGameConfig = {showCollisionBoxes: true};

  private constructor(){
    this.gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.gameCanvas.style.border = '1px solid black';
    this.gameCanvas.style.background = '#ccc';
    this.gameCanvas.width = 800;
    this.gameCanvas.height = 600;
    this.pressedKeys = {};
    //Load tiles to cache:
    this.cachedTiles = gameSets.tiles;
    //Loads initial room:
    this.currentRoom = gameSets.configs.initialRoom;
  }

  /**
   * Initializes the game. Called outside Game class.
   */
  public static init(){
    this._instance = new Game();
    //Initializes the keyboard events listener:
    document.addEventListener('keyup', (e) => this.handleKeyupEvent(e));
    document.addEventListener('keydown', (e) => this.handleKeydownEvent(e));
  }

  /**
   * Runs the current cycle. Called at setInterval() outside Game class every frame.
   */
  public static _run(){
    this.moveEntities();
    this.runEntities();
    this.renderEntities();
  }

  /**
   * Iterates every Graphic/Physic entity of current room at current cycle to 
   * refresh their _x, _y position in function of their _vSpeed and _hSpeed.
   */
  private static moveEntities(){
    this._instance.currentRoom.entities.forEach(entity => {
      if(entity instanceof GraphicEntity || entity instanceof PhysicEntity){
        entity._refreshPosition();
      }
    })
    this._instance.currentRoom._handleCollisions();
  }

  /**
   * Runs the run() of literally every entity of the current room at current cycle.
   */
  private static runEntities(){
    this._instance.currentRoom.entities.forEach(entity => {
      entity.run();
    })
  }

  /**
   * Iterates every Graphic/Physic entity of the current room and draw 
   * their sprite/animation frame at current cycle.
   */
  private static renderEntities(){
    const canvas = this._instance.gameCanvas;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    //Sorts entities by depth:
    let sortedEntities = this._instance.currentRoom.getDrawableEntities()
    .sort((entityA, entityB) => entityA._get('_depth') - entityB._get('_depth'));
    //Iterate drawable entities and render them:
    sortedEntities.forEach((entity) =>{
      if(entity instanceof GraphicEntity){
        let sprite = entity._getSprite();
        let tile = this.getCachedTile(sprite.getTile());
        let img = tile.getElement();
        let tileIndex = sprite.getTileIndex();
        let sx = tileIndex.x * tile.getSizeX();
        let sy = tileIndex.y * tile.getSizeY();
        let sWidth = tile.getSizeX();
        let sHeight = tile.getSizeY();
        let dx = entity._get('_x') - (sprite.getXPivot() * sprite.getXScale());
        let dy = entity._get('_y') - (sprite.getYPivot() * sprite.getYScale());
        let rotation = sprite.getRotation();
        let flipHor = sprite.getFlipHor();
        let flipVer = sprite.getFlipVer();
        let dWidth = sprite.getXScale() * (flipHor ? -sWidth : sWidth);
        let dHeight = sprite.getYScale() * (flipVer ? -sHeight : sHeight);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        if(this._instance.config.showCollisionBoxes){
          ctx.strokeStyle = '#FFFFFF';
          ctx.beginPath();
          let collider = entity.getCollisionMask().instance;
          collider.draw(ctx);
          ctx.stroke();
        }
        ctx.restore();
      }
    })
  }

  /**
   * Returns a cached tile to be assigned to a sprite or animation.
   * @param name The registered tile name.
   */
  public static getCachedTile(name: string): Tile{
    return this._instance.cachedTiles[name];
  }

  /**
   * Check if a key is being pressed.
   * @param key Key (ex: 'q', 'F5', '9', 'Shift')
   */
  public static isKeyPressed(key: string): boolean{
    return this._instance.pressedKeys[key];
  }

  /**
   * Passes the keyup event to this.keyUpEvent so it may be pssed to entities.
   * @param e Event
   */
  private static handleKeyupEvent(e: KeyboardEvent){
    this._instance.pressedKeys[e.key] = false;
    this._instance.currentRoom.entities.forEach(entity => entity.onKeyUp(e))
  }
  /**
   * Passes the keydown event to this.keyDownEvent so it may be pssed to entities.
   * @param e Event
   */
  private static handleKeydownEvent(e: KeyboardEvent){
    this._instance.pressedKeys[e.key] = true;
    this._instance.currentRoom.entities.forEach(entity => entity.onKeyDown(e))
  }
}

Game.init();
setInterval((() => Game._run()), 20);