import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Player from "../models/playerModel";

const deleteImageFile = (imagePath) => {
  if (!imagePath) return;
  const fullPath = path.join(__dirname, "../uploads", path.basename(imagePath));
  fs.unlink(fullPath, () => {});
};

const formatValidationErrors = (error) =>
  Object.values(error.errors).map(({ path, message }) => ({
    field: path,
    message,
  }));

const handlePlayerError = (res, error) => {
  if (error && error.name === "ValidationError") {
    return res.status(400).json({
      message: "Invalid player data.",
      errors: formatValidationErrors(error),
    });
  }

  if (error && error.name === "CastError") {
    return res.status(400).json({ message: "Invalid player id." });
  }

  console.error(error);

  return res.status(500).json({
    message: "Something went wrong while processing the player request.",
  });
};

export const addNewPlayer = async (req, res) => {
  try {
    const data = Object.assign({}, req.body);
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    const newPlayer = await Player.create(data);
    return res.status(201).json(newPlayer);
  } catch (error) {
    if (req.file) deleteImageFile(req.file.filename);
    return handlePlayerError(res, error);
  }
};

export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find({}).sort({ lastName: 1, firstName: 1 });
    return res.json(players);
  } catch (error) {
    return handlePlayerError(res, error);
  }
};

export const getPlayerWithID = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.playerid)) {
      return res.status(400).json({ message: "Invalid player id." });
    }

    const player = await Player.findById(req.params.playerid);

    if (!player) {
      return res.status(404).json({ message: "Player not found." });
    }

    return res.json(player);
  } catch (error) {
    return handlePlayerError(res, error);
  }
};

export const updatePlayer = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.playerid)) {
      return res.status(400).json({ message: "Invalid player id." });
    }

    const body = Object.assign({}, req.body);
    const shouldRemoveImage =
      body.removeImage === true ||
      body.removeImage === "true" ||
      body.removeImage === 1 ||
      body.removeImage === "1";

    const existing = await Player.findById(req.params.playerid);
    if (!existing) {
      return res.status(404).json({ message: "Player not found." });
    }

    const data = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      iscoach: body.iscoach,
      team: body.team,
      speed: body.speed,
      strength: body.strength,
      endurance: body.endurance,
      ability: body.ability,
      techniques: body.techniques,
      tactical: body.tactical,
    };

    if (req.file) {
      if (existing.image) deleteImageFile(existing.image);
      data.image = `/uploads/${req.file.filename}`;
    } else if (shouldRemoveImage) {
      if (existing.image) deleteImageFile(existing.image);
    }

    let player;
    if (shouldRemoveImage && !req.file) {
      player = await Player.findByIdAndUpdate(
        req.params.playerid,
        { $set: data, $unset: { image: 1 } },
        { new: true }
      );
    } else {
      player = await Player.findByIdAndUpdate(
        req.params.playerid,
        { $set: data },
        { new: true, runValidators: true }
      );
    }

    return res.json(player);
  } catch (error) {
    if (req.file) deleteImageFile(req.file.filename);
    return handlePlayerError(res, error);
  }
};

export const deletePlayer = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.playerid)) {
      return res.status(400).json({ message: "Invalid player id." });
    }

    const player = await Player.findByIdAndDelete(req.params.playerid);

    if (!player) {
      return res.status(404).json({ message: "Player not found." });
    }

    if (player.image) deleteImageFile(player.image);

    return res.json({ message: "Successfully deleted player!" });
  } catch (error) {
    return handlePlayerError(res, error);
  }
};