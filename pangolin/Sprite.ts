import { Tile } from "./Tile";

export interface ITileIndex{
  x: number,
  y: number
}

export class Sprite {
  private tile: string;   //Sprite tile name (must be registered on cached tiles)
  private tileIndex: ITileIndex;  //Sprite tile index
  private xScale: number;   //Sprite x axis drawing scale
  private yScale: number;   //Sprite y axis drawing scale
  private rotation: number;   //Sprite rotation
  private flipVer: boolean;   //Flip sprite vertically?
  private flipHor: boolean;   //Flip sprite horizontally?
  private xPivot: number;   //Sprite x axis drawing origin
  private yPivot: number;   //Sprite y axis drawing origin

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

  /**
   * Returns the registered cached tile name of the sprite
   */
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