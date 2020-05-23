import { Tile } from "./Tile";
import { Room } from "./Room";
import { GraphicEntity } from "./GraphicEntity";
import { PhysicEntity } from "./PhysicEntity";
import gameSets from '../src/main';

export interface IGameConfig {
  showCollisionBoxes: boolean
}

export interface IMouseStatus {
  leftButtonPressed: Boolean,
  rightButtonPressed: Boolean,
  middleButtonPressed: Boolean,
  x: Number,
  y: Number
}

export class Game{

  private static pressedKeys: any;
  private static mouseStatus: IMouseStatus;
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
    //Initializes mouseStatus:
    this.mouseStatus = {
      leftButtonPressed: false,
      rightButtonPressed: false,
      middleButtonPressed: false,
      x: 0,
      y: 0
    };
    //Initializes the keyboard events listener:
    document.addEventListener('keyup', (e) => this.handleKeyupEvent(e));
    document.addEventListener('keydown', (e) => this.handleKeydownEvent(e));
    document.addEventListener('mousedown', (e) => this.handleMouseDownEvent(e));
    document.addEventListener('mouseup', (e) => this.handleMouseUpEvent(e));
    document.addEventListener('mousemove', (e) => this.trackMousePosition(e));
  }

  /**
   * Runs the current cycle. Called at setInterval() outside Game class every frame.
   */
  public static run(){
    this.moveEntities();
    this.runEntities();
    this.renderEntities();
  }

  private static trackMousePosition(mouseEvent: MouseEvent){
    this.mouseStatus.x = mouseEvent.offsetX;
    this.mouseStatus.y = mouseEvent.offsetY;
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

  public static getMouseStatus(): IMouseStatus{
    return {...this.mouseStatus};
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

  private static handleMouseDownEvent(e: MouseEvent){
    switch(e.button){
      case 0: this.mouseStatus.leftButtonPressed = true; break;
      case 1: this.mouseStatus.middleButtonPressed = true; break;
      case 2: this.mouseStatus.rightButtonPressed = true; break;
    }
    this.mouseStatus.x = e.offsetX;
    this.mouseStatus.y = e.offsetY;
    this.currentRoom.entities.forEach(entity => entity.onGlobalMouseDown(e));
  }

  private static handleMouseUpEvent(e: MouseEvent){
    switch(e.button){
      case 0: this.mouseStatus.leftButtonPressed = false; break;
      case 1: this.mouseStatus.middleButtonPressed = false; break;
      case 2: this.mouseStatus.rightButtonPressed = false; break;
    }
    this.mouseStatus.x = e.offsetX;
    this.mouseStatus.y = e.offsetY;
    this.currentRoom.entities.forEach(entity => entity.onGlobalMouseUp(e));
  }
}

Game.init();
setInterval((() => Game.run()), 20);