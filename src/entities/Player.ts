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

export class Player extends pangolin.GraphicEntity {

  constructor(){
    const sprite = new pangolin.Animation('mainTile', animFrames, 5, 3, 3);
    super(sprite, 100, 50);
  }
}