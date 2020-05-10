import pangolin from '../../pangolin/index';

export class Player extends pangolin.GraphicEntity {
  constructor(){
    const sprite = new pangolin.Sprite('mainTile', {x: 8, y: 0}, 3, 3);
    super(sprite, 50, 50);
  }
}