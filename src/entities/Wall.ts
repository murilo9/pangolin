import pangolin from '../../pangolin/index';

export class Wall extends pangolin.PhysicEntity {
  constructor(){
    const sprite = new pangolin.Sprite('mainTile', {x: 1, y: 0}, 1, 1, 0, 8, 24);
    let startX = 100;
    let startY = 55;
    const collisionMask = new pangolin.CircleCollisionMask(startX, startY, 8);
    super(sprite, collisionMask, true, startX, startY, startY);
  }
}