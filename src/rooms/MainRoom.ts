import pangolin from '../../pangolin/index';
import { Player } from '../entities/Player';

export default class MainRoom extends pangolin.Room {
  constructor(){
    let player = new Player();
    super([player]);
  }
}