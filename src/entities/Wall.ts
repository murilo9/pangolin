import pangolin from '../../pangolin/index';

export class Wall extends pangolin.PhysicEntity {
  constructor(){
    const sprite = new pangolin.Sprite('mainTile', {x: 1, y: 0});
    let startX = 500;
    let startY = 100;
    const collisionMask = new pangolin.CircleCollisionMask(startX, startY, 8);
    super(sprite, collisionMask, true, startX, startY);
  }
}