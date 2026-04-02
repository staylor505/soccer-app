import React from "react";

const PlayerList = (props) => {
  return (
    <div className="panel-card">
      <ul className="collection with-header player-list">
        <li className="collection-header">
          <h4>Players</h4>
        </li>
        {props.isLoading ? (
          <li className="collection-item no-players">Loading players...</li>
        ) : props.players.length === 0 ? (
          <li className="collection-item no-players">No Players To Display</li>
        ) : (
          props.players.map((item) => (
            <li className="collection-item" key={item._id}>
              <button
                type="button"
                className={`player-list-item ${
                  props.currentPlayerId === item._id ? "active" : ""
                }`}
                onClick={() => props.updateCurrentPlayer(item)}
              >
                <span>{item.firstName} {item.lastName}</span>
                <small>{item.team || "No team assigned"}</small>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PlayerList;
