import { Tile } from "./Tile";
import { Room } from "./Room";
import { GraphicEntity } from "./GraphicEntity";
import { PhysicEntity } from "./PhysicEntity";
import gameSets from '../src/main';

export interface IGameConfig {
  showCollisionBoxes: boolean
}

export class Game{

  private static _instance: Game;
  private static keyUpEvent: KeyboardEvent;
  private static keyDownEvent: KeyboardEvent;

  private static pressedKeys: any;
  private static gameCanvas: HTMLCanvasElement;
  private static cachedTiles;
  private static currentRoom: Room;
  private static config: IGameConfig = {showCollisionBoxes: true};

  private constructor(){
    
  }

  /**
   * Initializes the game. Called outside Game class.
   */
  public static init(){
    //COnfigure game canvas:
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
    //Initializes the keyboard events listener:
    document.addEventListener('keyup', (e) => this.handleKeyupEvent(e));
    document.addEventListener('keydown', (e) => this.handleKeydownEvent(e));
  }

  /**
   * Runs the current cycle. Called at setInterval() outside Game class every frame.
   */
  public static run(){
    this.moveEntities();
    this.runEntities();
    this.renderEntities();
  }

  /**
   * Iterates every Graphic/Physic entity of current room at current cycle to 
   * refresh their _x, _y position in function of their _vSpeed and _hSpeed.
   */
  private static moveEntities(){
    this.currentRoom.entities.forEach(entity => {
      if(entity instanceof GraphicEntity || entity instanceof PhysicEntity){
        entity._refreshPosition();
      }
    })
    this.currentRoom._handleCollisions();
  }

  /**
   * Runs the run() of literally every entity of the current room at current cycle.
   */
  private static runEntities(){
    this.currentRoom.entities.forEach(entity => {
      entity.run();
    })
  }

  /**
   * Iterates every Graphic/Physic entity of the current room and draw 
   * their sprite/animation frame at current cycle.
   */
  private static renderEntities(){
    const canvas = this.gameCanvas;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    //Sorts entities by depth:
    let sortedEntities = this.currentRoom.getDrawableEntities()
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
        if(this.config.showCollisionBoxes){
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
    return this.cachedTiles[name];
  }

  /**
   * Check if a key is being pressed.
   * @param key Key (ex: 'q', 'F5', '9', 'Shift')
   */
  public static isKeyPressed(key: string): boolean{
    return this.pressedKeys[key];
  }

  /**
   * Passes the keyup event to this.keyUpEvent so it may be pssed to entities.
   * @param e Event
   */
  private static handleKeyupEvent(e: KeyboardEvent){
    this.pressedKeys[e.key] = false;
    this.currentRoom.entities.forEach(entity => entity.onKeyUp(e))
  }
  /**
   * Passes the keydown event to this.keyDownEvent so it may be pssed to entities.
   * @param e Event
   */
  private static handleKeydownEvent(e: KeyboardEvent){
    this.pressedKeys[e.key] = true;
    this.currentRoom.entities.forEach(entity => entity.onKeyDown(e))
  }
}

Game.init();
setInterval((() => Game.run()), 20);