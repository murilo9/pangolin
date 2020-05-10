import { Tile } from "./Tile";

export interface ITileIndex{
  x: number,
  y: number
}

export class Sprite {
  private tile: Tile;
  private tileIndex: ITileIndex;
  private xScale: number;
  private yScale: number;

  constructor(tile: Tile, tileIndex: ITileIndex, xScale: number = 1, yScale: number = 1){
    this.tile = tile;
    this.tileIndex = tileIndex;
    this.xScale = xScale;
    this.yScale = yScale;
  }

  getTile(): Tile{
    return this.tile;
  }

  getTileIndex(): ITileIndex{
    return this.tileIndex;
  }

  getXScale(): number{
    return this.xScale;
  }

  getYScale(): number{
    return this.yScale;
  }
}