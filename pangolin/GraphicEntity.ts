import { Entity } from './Entity';
import { Sprite } from './Sprite';

export class GraphicEntity extends Entity {
  private _x: number;
  private _y: number;
  private _sprite: Sprite;
  
  public _visible: boolean;

  constructor(sprite: Sprite, x: number = 0, y: number = 0, visible: boolean = true){
    super();
    this._x = x;
    this._y = y;
    this._sprite = sprite;
    this._visible = visible;
  }

  _get(attr: string){
    return this[attr];
  }

  _getSprite(){
    return this._sprite;
  }
}