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

  /**
   * Gets the <img> element representing the tile.
   */
  public getElement(): HTMLImageElement{
    return this.element;
  }

  /**
   * Gets the tile x grid width.
   */
  getSizeX(): number{
    return this.xSize;
  }

  /**
   * Gets the tile y grid height.
   */

  getSizeY(): number{
    return this.ySize;
  }
}