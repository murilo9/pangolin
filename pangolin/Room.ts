import { Entity } from "./Entity";

export class Room {
  private entities: Array<Entity>;

  constructor(initialEntities: Array<Entity>){
    this.entities = initialEntities;
  }

  pushEntity(entity: Entity){
    
  }
}