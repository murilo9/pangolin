import { Entity } from "./Entity";
import { Tile } from "./Tile";
import { Room } from "./Room";
import tile1 from '../src/tiles/main.png';
import { GraphicEntity } from "./GraphicEntity";
import { Sprite } from "./Sprite";

export class Game{

  private static _instance: Game;

  gameCanvas: HTMLCanvasElement;
  entities: Array<Entity> = [];
  cachedTiles: Array<Tile> = [];
  currentRoom: Room;

  private constructor(){
    this.gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.gameCanvas.width = 800;
    this.gameCanvas.height = 600;
    const mainTile = new Tile(tile1, 16, 32);
    this.cachedTiles.push(mainTile);
    const sprite = new Sprite(mainTile, {x: 8, y: 0}, 3, 3);
    const entity1 = new GraphicEntity(sprite, 50, 50);
    this.entities.push(entity1);
  }

  public static init(){
    this._instance = new Game();
  }

  public static run(){
    const canvas = this._instance.gameCanvas;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._instance.entities.forEach((entity: GraphicEntity) =>{
      let sprite = entity._getSprite();
      let tile = sprite.getTile();
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
}

Game.init();
setTimeout((() => Game.run()), 100);