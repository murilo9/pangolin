export class Tile {
  element: HTMLImageElement;
  xSize: number;
  ySize: number;

  constructor(imgSrc: string, xSize: number, ySize: number){
    this.element = document.createElement('img');
    this.element.src = imgSrc;
    this.xSize = xSize;
    this.ySize = ySize;
  }

  public getElement(): HTMLImageElement{
    return this.element;
  }

  getSizeX(){
    return this.xSize;
  }

  getSizeY(){
    return this.ySize;
  }
}