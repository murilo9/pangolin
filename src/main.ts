import entities from './entities/index';
import rooms from './rooms/index';
import tiles from  './tiles/index';

export default{
  entities,
  rooms,
  tiles,
  configs: {
    screenWidth: 800,
    screenHeight: 600,
    initialRoom: new rooms.MainRoom()
  }
}