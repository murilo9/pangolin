import { Entity } from "./Entity";
import { Tile } from "./Tile";
import { Room } from "./Room";
import tile1 from '../src/tiles/main.png';
import { GraphicEntity } from "./GraphicEntity";
import { Sprite } from "./Sprite";
import gameSets from '../src/main';

export class Game{

  private static _instance: Game;

  private gameCanvas: HTMLCanvasElement;
  private cachedTiles;
  private currentRoom: Room;

  private constructor(){
    this.gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.gameCanvas.width = 800;
    this.gameCanvas.height = 600;
    //Carrega os tiles pro cache:
    this.cachedTiles = gameSets.tiles;
    //Carrega o room inicial:
    this.currentRoom = gameSets.configs.initialRoom;
  }

  public static init(){
    this._instance = new Game();
  }

  public static run(){
    const canvas = this._instance.gameCanvas;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._instance.currentRoom.entities.forEach((entity: GraphicEntity) =>{
      let sprite = entity._getSprite();
      let tile = this.getCachedTile(sprite.getTile());
      let img = tile.getElement();
      let sx = sprite.getTileIndex().x * tile.getSizeX();
      let sy = sprite.getTileIndex().y * tile.getSizeY();
      let sWidth = tile.getSizeX();
      let sHeight = tile.getSizeY();
      let dx = entity._get('_x');
      let dy = entity._get('_y');
      let dWidth = sprite.getXScale() * sWidth;
      let dHeight = sprite.getYScale() * sHeight;
      console.log(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    })
  }

  public static getCachedTile(name: string): Tile{
    return this._instance.cachedTiles[name];
  }
}

Game.init();
setTimeout((() => Game.run()), 100);