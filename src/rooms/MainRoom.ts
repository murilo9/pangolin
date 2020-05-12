import pangolin from '../../pangolin/index';
import { Player } from '../entities/Player';
import { Wall } from '../entities/Wall';

export default class MainRoom extends pangolin.Room {
  constructor(){
    let player = new Player();
    let wall = new Wall();
    super([player, wall]);
  }
}