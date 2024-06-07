import React, { useState } from 'react';
import axios from 'axios';

function PlayerForm() {

  const [formData, setFormData] = useState({firstName:'', lastName:'', email:'', phone:'', iscoach:false, team:'', speed:'', strength:'', endurance:'', ability:'', techniques:'', tactical:''});

  function submitPlayer(event) {
    event.preventDefault();

    axios.post('http://localhost:4000/players', formData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

    window.location.reload();
  }

  function handleChange(event) {
    const {name, value} = event.target;
    setFormData((prevFormData) => ({...prevFormData, [name]:value}))
  }

  function handleCheckBox(event) {
    const {name, checked} = event.target;
    setFormData((prevFormData) => ({...prevFormData, [name]:checked}))
  }
  
  return ( 
    <div className="row">
      <h1 className='center'>Add a new player</h1>
      <form className="col s12" onSubmit={submitPlayer}>
        <div className="row">
          <div className="input-field col s6">
            <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className="input-field col s6">
            <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} />
            <label htmlFor="lastName">Last Name</label>
          </div>
          <div className="input-field col s6">
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s6">
            <input id="phone" name="phone"  type="tel" value={formData.phone} onChange={handleChange} />
            <label htmlFor="phone">Phone</label>
          </div>
          <div className="input-field col s6">
            <label>
              <input id="iscoach" name="iscoach" className="filled-in" type="checkbox" checked={formData.iscoach} onChange={handleCheckBox} />
              <span>Is Coach?</span>
            </label>
          </div>
          <div className="input-field col s6">
            <input id="team" name="team" type="text" value={formData.team} onChange={handleChange} />
            <label htmlFor="team">Team</label>
          </div>
          <div className="input-field col s6">
            <input id="speed" name="speed" type="number" max="3" value={formData.speed} onChange={handleChange} />
            <label htmlFor="speed">Speed</label>
          </div>
          <div className="input-field col s6">
            <input id="strength" name="strength" type="number" max="3" value={formData.strength} onChange={handleChange} />
            <label htmlFor="strength">Strength</label>
          </div>
          <div className="input-field col s6">
            <input id="endurance" name="endurance" type="number" max="3" value={formData.endurance} onChange={handleChange} />
            <label htmlFor="endurance">Endurance</label>
          </div>
          <div className="input-field col s6">
            <input id="ability" name="ability" type="number" max="3" value={formData.ability} onChange={handleChange} />
            <label htmlFor="ability">Ability</label>
          </div>
          <div className="input-field col s6">
            <input id="techniques" name="techniques" type="number" max="3" value={formData.techniques} onChange={handleChange} />
            <label htmlFor="techniques">Techniques</label>
          </div>
          <div className="input-field col s6">
            <input id="tactical" name="tactical" type="number" max="3" value={formData.tactical} onChange={handleChange} />
            <label htmlFor="tactical">Tactical</label>
          </div>
        </div>
        <button className='btn waves-effect waves-light' type='submit' name='action'>Add Player</button>
      </form>
    </div>
  );
}

export default PlayerForm;