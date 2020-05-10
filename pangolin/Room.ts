import { Entity } from "./Entity";

export class Room {
  public entities: Array<Entity>;

  constructor(initialEntities: Array<Entity>){
    this.entities = initialEntities;
  }

  pushEntity(entity: Entity){
    this.entities.push(entity);
  }
}