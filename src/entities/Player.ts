import pangolin from '../../pangolin/index';

const animFrames = [
  {x: 10, y: 1},
  {x: 12, y: 1},
  {x: 13, y: 1},
  {x: 14, y: 1},
  {x: 15, y: 1},
  {x: 16, y: 1}
];

const standingFrames = [
  {x: 8, y: 1},
  {x: 9, y: 1}
]

export class Player extends pangolin.PhysicEntity {

  constructor(){
    let scaleX = 2;
    let scaleY = 2;
    const sprite = new pangolin.Animation('mainTile', animFrames, 5, scaleX, scaleY, 0, 8, 24);
    let startX = 50;
    let startY = 80;
    const collisionMask = new pangolin.CircleCollisionMask(startX, startY, 8, scaleY);
    super(sprite, collisionMask, false, startX, startY, 0, 0, 0.5);
  }

  run(){
    this._depth = this._y;
  }
}