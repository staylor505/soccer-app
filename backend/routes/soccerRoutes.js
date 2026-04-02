import {
  addNewPlayer,
  deletePlayer,
  getPlayers,
  getPlayerWithID,
  updatePlayer
} from '../controllers/playerControllers';
import upload from '../upload';

const routes = (app) => {
  app.route('/players')
  // GET endpoint
    .get(getPlayers)
  // POST endpoint
    .post(upload.single('image'), addNewPlayer);

  app.route('/players/:playerid')
    // GET specific player
    .get(getPlayerWithID)
    // UPDATE specific player
    .put(upload.single('image'), updatePlayer)
    // DELETE specific player
    .delete(deletePlayer);

  app.route('/player/:playerid')
    // GET specific player
    .get(getPlayerWithID)
    // UPDATE specific player
    .put(updatePlayer)
    // DELETE specific player
    .delete(deletePlayer)
}

export default routes;