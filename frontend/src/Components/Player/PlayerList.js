import React from "react";

const PlayerList = (props) => {
  return (
    <div>
      <ul className="collection with-header">
        <li className="collection-header">
          <h4>Players</h4>
        </li>
        {props.players.length === 0 ? (
          <li className="collection-item no-players">No Players To Display</li> // Display this message when the array is empty
        ) : (
          props.players.map((item) => (
            <a
              href="#!"
              className="collection-item"
              key={item._id}
              onClick={props.updateCurrentPlayer.bind(this, item)}
            >
              {item.firstName} {item.lastName}
            </a>
          ))
        )}
      </ul>
    </div>
  );
};

export default PlayerList;
