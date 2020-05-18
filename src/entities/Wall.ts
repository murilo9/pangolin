import pangolin from '../../pangolin/index';

export class Wall extends pangolin.PhysicEntity {
  constructor(){
    let scaleX = 2;
    let scaleY = 2;
    const sprite = new pangolin.Sprite('mainTile', {x: 1, y: 0}, scaleX, scaleY, 0, 8, 24);
    let startX = 150;
    let startY = 55;
    let collisionPoints = [[-8, -8], [8, -8], [8, 8], [-8, 8]];
    const collisionMask = new pangolin.PolygonCollisionMask(
      startX, startY, collisionPoints, 0, scaleX, scaleY
    );
    super(sprite, collisionMask, true, startX, startY, startY);
  }
}