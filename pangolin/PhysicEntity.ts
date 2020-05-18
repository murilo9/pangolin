import {GraphicEntity} from './GraphicEntity';
import {Circle, Polygon} from './collisions/src/Collisions';
import {Sprite} from './Sprite';

export abstract class CollisionMask {
  /**
   * @type {Circle || Polygon}
   */
  public instance: {
    scale: number, 
    scale_x: number, 
    scale_y: number,
    x: number,
    y: number,
    draw: Function,
    potentials: any,
    collides: any
  };
}

export class CircleCollisionMask extends CollisionMask {
  public scale: number;

  constructor(x: number, y: number,radius: number, scale: number = 1){
    super();
    this.scale = scale;
    this.instance = new Circle(x, y, radius, scale);
  }
}

export class PolygonCollisionMask extends CollisionMask {
  public xScale: number;
  public yScale: number;

  constructor(x: number, y: number, points: Array<number[]>, rotation: number = 0,
  xScale: number = 1, yScale: number = 1){
    super();
    this.xScale = xScale;
    this.yScale = yScale;
    this.instance = new Polygon(x, y, points, rotation, xScale, yScale);
  }
}

export class PhysicEntity extends GraphicEntity {
  private _collisionMask: CollisionMask;
  private _static: boolean;

  constructor(sprite: Sprite, collisionMask: CollisionMask, _static: boolean = false, 
  x: number = 0, y: number = 0, depth: number = 0, vSpeed: number = 0, 
  hSpeed: number = 0, visible: boolean = true){
    super(sprite, x, y, depth, vSpeed, hSpeed, visible);
    this._collisionMask = collisionMask;
    this._static = _static;
  }

  /**
   * Refreshes the entity position at current frame.
   */
  public _refreshPosition(): void{
    this._x += this._hSpeed;
    this._y += this._vSpeed;
    this._collisionMask.instance.x = this._x;
    this._collisionMask.instance.y = this._y;
  }

  /**
   * Gets the entity collision mask.
   */
  public getCollisionMask(): CollisionMask{
    return this._collisionMask;
  }

  public setCollisionMaskScale(arg1: number = null, arg2: number = null){
    if(this._collisionMask.instance instanceof CircleCollisionMask){
      this._collisionMask.instance.scale = arg1;
    }
    else if(this._collisionMask.instance instanceof PolygonCollisionMask){
      this._collisionMask.instance.scale_x = arg1;
      this._collisionMask.instance.scale_y = arg2;
    }
  }

  /**
   * Gets os sets the entity isStatic attribute.
   */
  public isStatic(set: boolean = null): boolean{
    if(set !== null)
      this._static = (set ? true : false);
    else
      return this._static;
  }
}