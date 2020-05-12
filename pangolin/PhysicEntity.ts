import {GraphicEntity} from './GraphicEntity';
import {Circle} from './collisions/src/Collisions';
import {Sprite} from './Sprite';

export class CollisionMask {
  public instance;
}

export class CircleCollisionMask extends CollisionMask {
  constructor(x: number, y: number,radius: number){
    super();
    this.instance = new Circle(x, y, radius);
  }
}

export class PolygonCollisionMask extends CollisionMask {

}

export class PhysicEntity extends GraphicEntity {
  private _collisionMask: CollisionMask;
  private _static: boolean;

  constructor(sprite: Sprite, collisionMask: CollisionMask, _static: boolean = false, 
    x: number = 0, y: number = 0, vSpeed: number = 0, hSpeed: number = 0, 
    visible: boolean = true){
    super(sprite, x, y, vSpeed, hSpeed, visible);
    this._collisionMask = collisionMask;
    this._static = _static;
  }

  _refreshPosition(){
    this._x += this._hSpeed;
    this._y += this._vSpeed;
    this._collisionMask.instance.x = this._x;
    this._collisionMask.instance.y = this._y;
  }

  getCollisionMask(): CollisionMask{
    return this._collisionMask;
  }

  isStatic(): boolean{
    return this._static;
  }
}