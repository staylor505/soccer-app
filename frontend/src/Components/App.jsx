import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import api from "../api.jsx";
import PlayerList from "./Player/PlayerList.jsx";
import PlayerSingle from "./Player/PlayerSingle.jsx";
import PlayerForm from "./Player/PlayerForm.jsx";

function App() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const formRef = useRef(null);

  const scrollToForm = useCallback(() => {
    requestAnimationFrame(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, []);

  const fetchPlayers = useCallback((selectedPlayerId) => {
    setIsLoading(true);
    setErrorMessage("");

    api
      .get("/players")
      .then((response) => {
        const nextPlayers = response.data;
        const nextCurrentPlayer =
          nextPlayers.find((player) => player._id === selectedPlayerId) ||
          nextPlayers.find((player) => player._id === currentPlayer?._id) ||
          nextPlayers[0] ||
          null;

        setPlayers(nextPlayers);
        setCurrentPlayer(nextCurrentPlayer);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.message || "Unable to load players right now."
        );
        setIsLoading(false);
      });
  }, [currentPlayer?._id]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  useEffect(() => {
    if (isFormVisible) {
      scrollToForm();
    }
  }, [isFormVisible, editingPlayer, scrollToForm]);

  const handlePlayerSaved = (player) => {
    setEditingPlayer(null);
    setIsFormVisible(false);
    fetchPlayers(player._id);
  };

  const updateCurrentPlayer = (item) => {
    setCurrentPlayer(item);
    setEditingPlayer(null);
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
    setIsFormVisible(true);
  };

  const handleCancelEdit = () => {
    setEditingPlayer(null);
    setIsFormVisible(false);
  };

  const handleShowForm = () => {
    setIsFormVisible(true);
    setEditingPlayer(null);
  };

  const handleDelete = (playerId) => {
    setDeleteConfirmationOpen(true);
    setPlayerToDelete(playerId);
  };

  const handleConfirmDelete = () => {
    api
      .delete(`/players/${playerToDelete}`)
      .then(() => {
        setDeleteConfirmationOpen(false);
        setPlayerToDelete(null);
        setEditingPlayer(null);
        setCurrentPlayer(null);
        fetchPlayers();
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.message || "Unable to delete player right now."
        );
        setDeleteConfirmationOpen(false);
        setPlayerToDelete(null);
      });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setPlayerToDelete(null);
  };

  return (
    <div className="app-shell container-fluid">
        <div className="row">
          <nav className="app-nav teal darken-3">
            <div className="nav-wrapper col s12">
              <a href="/" className="brand-logo">
                <img src="favicon.ico" id="logo" alt="logo" />
                <span id="title">Soccer Management</span>
              </a>
            </div>
          </nav>
        </div>

        {errorMessage ? (
          <div className="row">
            <div className="col s12">
              <div className="page-status error-status">{errorMessage}</div>
            </div>
          </div>
        ) : null}

        <div className="row content-grid">
          <div className="col s12 l4">
            <PlayerList
              players={players}
              currentPlayerId={currentPlayer?._id}
              isLoading={isLoading}
              updateCurrentPlayer={updateCurrentPlayer}
            />
            {!isFormVisible && (
              <div className="row" style={{ marginTop: "1rem" }}>
                <div className="col s12 center">
                  <button
                    className="btn waves-effect waves-light teal"
                    onClick={handleShowForm}
                  >
                    <i className="material-icons left">add</i>
                    Add Player
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="col s12 l8">
            <PlayerSingle
              player={currentPlayer}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
        {isFormVisible && (
          <div className="row" ref={formRef}>
            <div className="col s12">
              <PlayerForm
                editingPlayer={editingPlayer}
                onPlayerSaved={handlePlayerSaved}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </div>
        )}

        {deleteConfirmationOpen && (
          <div className="delete-modal-overlay" onClick={handleCancelDelete}>
            <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
              <h4 style={{ marginTop: 0, marginBottom: "16px", color: "#16423c" }}>Delete Player</h4>
              <p style={{ marginBottom: "24px", color: "#555" }}>Are you sure you want to delete this player? This action cannot be undone.</p>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                <button
                  className="btn waves-effect waves-light grey"
                  onClick={handleCancelDelete}
                  style={{ margin: 0 }}
                >
                  Cancel
                </button>
                <button
                  className="btn waves-effect waves-light red"
                  onClick={handleConfirmDelete}
                  style={{ margin: 0 }}
                >
                  <i className="material-icons left">delete</i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}

export default App;
