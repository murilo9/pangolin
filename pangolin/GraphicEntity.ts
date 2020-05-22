import { Entity } from './Entity';
import { Sprite } from './Sprite';

export class GraphicEntity extends Entity {
  public _x: number;    //Entity x position on space
  public _y: number;    //Entity y position on space
  protected _sprite: Sprite;  //Entity sprite to be drawn
  protected _vSpeed: number;  //Entity vertical speed (incr./decrease y position every frame)
  protected _hSpeed: number;  //Entity horizontal speed (incr./decrease x position every frame)
  protected _depth: number;   //Entity depth (defines drawing sorting order)
  
  public _visible: boolean;   //If the entity may be drawed every frame

  constructor(sprite: Sprite, x: number = 0, y: number = 0, depth: number = 0, 
  vSpeed: number = 0, hSpeed: number = 0, visible: boolean = true){
    super();
    this._x = x;
    this._y = y;
    this._sprite = sprite;
    this._vSpeed = vSpeed;
    this._hSpeed = hSpeed;
    this._visible = visible;
    this._depth = depth;
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