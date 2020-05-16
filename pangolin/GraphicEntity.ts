import { Entity } from './Entity';
import { Sprite } from './Sprite';

export class GraphicEntity extends Entity {
  public _x: number;
  public _y: number;
  protected _sprite: Sprite;
  protected _vSpeed: number;
  protected _hSpeed: number;
  
  public _visible: boolean;

  constructor(sprite: Sprite, x: number = 0, y: number = 0, vSpeed: number = 0,
  hSpeed: number = 0, visible: boolean = true){
    super();
    this._x = x;
    this._y = y;
    this._sprite = sprite;
    this._vSpeed = vSpeed;
    this._hSpeed = hSpeed;
    this._visible = visible;
  }

  /**
   * Gets an entity attribute.
   * @param attr Attribute name
   */
  public _get(attr: string): any{
    return this[attr];
  }

  /**
   * Gets the entity sprite.
   */
  public _getSprite(): Sprite{
    return this._sprite;
  }

  /**
   * Refresh the entity's position at current cycle.
   */
  public _refreshPosition(): void{
    this._x += this._hSpeed;
    this._y += this._vSpeed;
  }
}