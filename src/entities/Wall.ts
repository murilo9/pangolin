import pangolin from '../../pangolin/index';

export class Wall extends pangolin.PhysicEntity {
  constructor(){
    let scaleX = 2;
    let scaleY = 2;
    const sprite = new pangolin.Sprite('mainTile', {x: 1, y: 0}, scaleX, scaleY, 0, 8, 24);
    let startX = 100;
    let startY = 55;
    const collisionMask = new pangolin.CircleCollisionMask(startX, startY, 8, scaleX);
    super(sprite, collisionMask, true, startX, startY, startY);
  }
}