import React from 'react';
import axios from 'axios';

class PlayerForm extends React.Component {
  
  submitPlayer(event) {
    event.preventDefault();

    axios.post('http://localhost:4000/players', {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      email: this.refs.email.value,
      phone: this.refs.phone.value,
      // iscoach: this.refs.iscoach.value,
      team: this.refs.team.value,
      speed: this.refs.speed.value,
      strength: this.refs.strength.value,
      endurance: this.refs.endurance.value,
      ability: this.refs.ability.value,
      techniques: this.refs.techniques.value,
      tactical: this.refs.tactical.value,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  render() { 
    return ( 
      <div className="row">
        <h1 className='center'>Add a new player</h1>
        <form className="col s12" onSubmit={this.submitPlayer.bind(this)}>
          <div className="row">
            <div className="input-field col s6">
              <input id="firstName" ref="firstName" type="text" />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="input-field col s6">
              <input id="lastName" ref="lastName" type="text" />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="input-field col s6">
              <input id="email" ref="email" type="email" />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s6">
              <input id="phone" ref="phone"  type="tel" />
              <label htmlFor="phone">Phone</label>
            </div>
            <div className="input-field col s6">
              <label>
                <input id="iscoach" ref="iscoach" className="filled-in" type="checkbox" value="" />
                <span>Is Coach?</span>
              </label>
            </div>
            <div className="input-field col s6">
              <input id="team" ref="team" type="text" />
              <label htmlFor="team">Team</label>
            </div>
            <div className="input-field col s6">
              <input id="speed" ref="speed" type="number" max="3" />
              <label htmlFor="speed">Speed</label>
            </div>
            <div className="input-field col s6">
              <input id="strength" ref="strength" type="number" max="3" />
              <label htmlFor="strength">Strength</label>
            </div>
            <div className="input-field col s6">
              <input id="endurance" ref="endurance" type="number" max="3" />
              <label htmlFor="endurance">Endurance</label>
            </div>
            <div className="input-field col s6">
              <input id="ability" ref="ability" type="number" max="3" />
              <label htmlFor="ability">Ability</label>
            </div>
            <div className="input-field col s6">
              <input id="techniques" ref="techniques" type="number" max="3" />
              <label htmlFor="techniques">Techniques</label>
            </div>
            <div className="input-field col s6">
              <input id="tactical" ref="tactical" type="number" max="3" />
              <label htmlFor="tactical">Tactical</label>
            </div>
          </div>
          <button className='btn waves-effect waves-light' type='submit' name='action'>Add Player</button>
        </form>
      </div>
    );
  }
}

export default PlayerForm;