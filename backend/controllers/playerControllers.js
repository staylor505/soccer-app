import mongoose from 'mongoose';
import { PlayerSchema } from '../models/playerModel';

const Player = mongoose.model('Player', PlayerSchema);

export const addNewPlayer = (req, res) => {
    let newPlayer = new Player(req.body);
    newPlayer.save()
      .then( () => { res.json(newPlayer) })
      .catch( (err) => { console.log(err) })
};

export const getPlayers = (req, res) => {
  Player.find({})
    .then( (players) => { res.json(players) })
    .catch( (err) => { console.log(err) })
};

export const getPlayerWithID = (req, res) => {
  Player.findById(req.params.playerid)
    .then( (player) => { res.json(player) })
    .catch( (err) => { console.log(err) })
};

export const updatePlayer = (req, res) => {
  Player.findOneAndUpdate({ _id: req.params.playerid}, req.body, {new: true})
    .then( (player) => { res.json(player) })
    .catch( (err) => { console.log(err) })
};

export const deletePlayer = (req, res) => {
  Player.deleteOne({ _id: req.params.playerid})
    .then( () => { res.json( {message: 'Successfully deleted player!'} ) })
    .catch( (err) => { console.log(err) })
};