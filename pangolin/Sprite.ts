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
  private xPivot: number;
  private yPivot: number;

  constructor(tileName: string, tileIndex: ITileIndex, xScale: number = 1, 
  yScale: number = 1, rotation: number = 0, xPivot: number = 0, 
  yPivot: number = 0, flipVer: boolean = false, flipHor: boolean = false){
    this.tile = tileName;
    this.tileIndex = tileIndex;
    this.xScale = xScale;
    this.yScale = yScale;
    this.rotation = rotation;
    this.xPivot = xPivot;
    this.yPivot = yPivot;
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

  getRotation(): number{
    return this.rotation;
  }

  getFlipVer(): boolean{
    return this.flipVer;
  }

  getFlipHor(): boolean{
    return this.flipHor;
  }

  getXPivot(): number{
    return this.xPivot;
  }

  getYPivot(): number{
    return this.yPivot;
  }
}