import { Entity } from "./Entity";
import Collisions from './collisions/src/Collisions';
import { PhysicEntity } from "./PhysicEntity";

export class Room {
  public entities: Array<Entity>;
  private collisionSystem: Collisions;

  constructor(initialEntities: Array<Entity>){
    this.collisionSystem = new Collisions();
    this.entities = [];
    initialEntities.forEach(entity => {
      this.pushEntity(entity);
    })
  }

  pushEntity(entity: Entity){
    this.entities.push(entity);
    if(entity instanceof PhysicEntity){
      this.collisionSystem.insert(entity.getCollisionMask().instance);
    }
  }

  handleCollisions(canvas: HTMLCanvasElement){
    const ctx = canvas.getContext('2d');
    this.collisionSystem.update();
    const result = this.collisionSystem.createResult();
    this.entities.forEach(entity => {
      if(entity instanceof PhysicEntity && !entity.isStatic()){
        const collider = entity.getCollisionMask().instance;
        const potentials = collider.potentials();
        for(const body of potentials){
          if(collider.collides(body, result)){
            entity._x -= result.overlap * result.overlap_x;
            entity._y -= result.overlap * result.overlap_y;
          }
        }
      }
    })
  }
}