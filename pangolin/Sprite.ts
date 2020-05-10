import { Tile } from "./Tile";

export interface ITileIndex{
  x: number,
  y: number
}

export class Sprite {
  private tile: string;
  private tileIndex: ITileIndex;
  private xScale: number;
  private yScale: number;
  private rotation: number;
  private flipVer: boolean;
  private flipHor: boolean;

  constructor(tile: string, tileIndex: ITileIndex, xScale: number = 1, yScale: number = 1, 
  rotation: number = 0, flipVer: boolean = false, flipHor: boolean = false){
    this.tile = tile;
    this.tileIndex = tileIndex;
    this.xScale = xScale;
    this.yScale = yScale;
    this.rotation = rotation;
    this.flipHor = flipHor;
    this.flipVer = flipVer;
  }

  getTile(): string{
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

  getRotation(){
    return this.rotation;
  }

  getFlipVer(){
    return this.flipVer;
  }

  getFlipHor(){
    return this.getFlipHor;
  }
}