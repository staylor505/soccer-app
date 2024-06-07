import {
  addNewPlayer,
  deletePlayer,
  getPlayers,
  getPlayerWithID,
  updatePlayer
} from '../controllers/playerControllers';

const routes = (app) => {
  app.route('/players')
  // GET endpoint
    .get(getPlayers)
  // POST endpoint
    .post(addNewPlayer);

  app.route('/player/:playerid')
    // GET specific player
    .get(getPlayerWithID)
    // UPDATE specific player
    .put(updatePlayer)
    // DELETE specific player
    .delete(deletePlayer)
}

export default routes;