import { Entity } from "./Entity";
import Collisions from './collisions/src/Collisions';
import { PhysicEntity } from "./PhysicEntity";
import { GraphicEntity } from "./GraphicEntity";

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

  /**
   * Pushes an entity to the room.
   * @param entity Entity to push
   */
  public pushEntity(entity: Entity){
    this.entities.push(entity);
    if(entity instanceof PhysicEntity){
      this.collisionSystem.insert(entity.getCollisionMask().instance);
    }
  }

  public getDrawableEntities(): Array<PhysicEntity>{
    return this.entities.filter(entity => 
      (entity instanceof GraphicEntity || entity instanceof PhysicEntity)
    ) as Array<PhysicEntity>;
  }

  /**
   * Process all room collisions.
   */
  public _handleCollisions(){
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