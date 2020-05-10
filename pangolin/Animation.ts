import { Sprite, ITileIndex } from "./Sprite";

export class Animation extends Sprite {
  private speed: number;
  private animationIndexes: Array<ITileIndex>;
  private animationFrame: number;
  private counter: number = 0;

  constructor(tile: string, animationIndexes: Array<ITileIndex>, 
  speed: number, xScale: number = 1, yScale: number = 1, rotation: number = 0, 
  flipVer: boolean = false, flipHor: boolean = false){
    super(tile, animationIndexes[0], xScale, yScale, rotation, flipVer, flipHor);
    this.animationIndexes = animationIndexes;
    this.animationFrame = 0;
    this.speed = speed;
  }

  getTileIndex(){
    if(this.counter >= this.speed){
      this.counter = 0;
      if(this.animationFrame >= this.animationIndexes.length - 1){
        this.animationFrame = 0;
      }
      else{
        this.animationFrame++;
      }
    }
    else{
      this.counter++;
    }
    return this.animationIndexes[this.animationFrame];
  }
}