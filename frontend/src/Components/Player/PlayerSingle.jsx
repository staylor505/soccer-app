import React from "react";

const renderValue = (value, fallback = "Not provided") => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return value;
};

const PlayerSingle = (props) => {
  if (!props.player?._id) {
    return (
      <div className="player-placeholder">
        <h3>Select a player</h3>
        <p>Choose a player from the list to view their details.</p>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col s12 xl10">
        <div className="card player-card">
          <div className="card-image">
            <img src="soccer.jpeg" alt="Soccer player kicking a soccer ball" />
            <span className="card-title teal lighten-1">
              {props.player.firstName} {props.player.lastName}
            </span>
          </div>
          <div className="card-content">
            <div className="player-details">
              <div className="details-column">
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{renderValue(props.player.phone)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{renderValue(props.player.email)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Is Coach:</span>
                  <span className="detail-value">{props.player.iscoach ? "Yes" : "No"}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Speed:</span>
                  <span className="detail-value">{renderValue(props.player.speed)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Strength:</span>
                  <span className="detail-value">{renderValue(props.player.strength)}</span>
                </div>
              </div>
              <div className="details-column">
                <div className="detail-row">
                  <span className="detail-label">Endurance:</span>
                  <span className="detail-value">{renderValue(props.player.endurance)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Ability:</span>
                  <span className="detail-value">{renderValue(props.player.ability)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Techniques:</span>
                  <span className="detail-value">{renderValue(props.player.techniques)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Tactical:</span>
                  <span className="detail-value">{renderValue(props.player.tactical)}</span>
                </div>
                {props.player.image && (
                  <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <p style={{ margin: "0 0 0.4rem", fontWeight: 600, color: "#16423c", fontSize: "0.9rem" }}>Player Photo</p>
                    <img
                      src={`http://localhost:4000${props.player.image}`}
                      alt={`${props.player.firstName} ${props.player.lastName}`}
                      style={{ width: "100%", maxWidth: 200, height: "auto", display: "block", margin: "0 auto", borderRadius: "4px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="card-action blue lighten-3">
            <p style={{ margin: 0 }}><b>Team:</b> <span className="white-text">{renderValue(props.player.team, "Free agent")}</span></p>
          </div>
          <div className="card-action">
            <button
              className="btn waves-effect waves-light blue"
              onClick={() => props.onEdit(props.player)}
            >
              <i className="material-icons left">edit</i>
              Edit
            </button>
            <button
              className="btn waves-effect waves-light red"
              onClick={() => props.onDelete(props.player._id)}
              style={{ marginLeft: "0.5rem" }}
            >
              <i className="material-icons left">delete</i>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSingle;