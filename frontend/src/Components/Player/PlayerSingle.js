import React from 'react';

const PlayerSingle  = (props) => {
  return (
    <div className="row">
      <div className="col s6 m6">
        <div className="card">
          <div className="card-image">
            <img src="soccer.jpeg" alt='Soccer player kicking a soccer ball' />
            <span className="card-title teal lighten-1">{props.player.firstName} {props.player.lastName}</span>
          </div>
          <div className="card-content">
            <div className="col s6">
              <p><b>Phone:</b> {props.player.phone}</p>
              <p><b>Email:</b> <span className='text'>{props.player.email}</span></p>
              <p><b>Is Coach:</b> {props.player.iscoach ? "Yes" : "No"}</p>
              <p><b>Speed:</b> {props.player.speed}</p>
              <p><b>Strength:</b> {props.player.strength}</p>
            </div>
            <div className="col s6">
              <p><b>Endurance:</b> {props.player.endurance}</p>
              <p><b>Ability:</b> {props.player.ability}</p>
              <p><b>Techniques:</b> {props.player.techniques}</p>
              <p><b>Tactical:</b> {props.player.tactical}</p>
            </div>
          </div>
          <div className="card-action blue lighten-3">
            <p><b>Team:</b> <span className="white-text">{props.player.team}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerSingle;