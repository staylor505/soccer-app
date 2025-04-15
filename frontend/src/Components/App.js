import React from "react";
import axios from "axios";
import "./App.css";
import PlayerList from "./Player/PlayerList";
import PlayerSingle from "./Player/PlayerSingle";
import PlayerForm from "./Player/PlayerForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      currentPlayer: {},
    };
    this.updateCurrentPlayer = this.updateCurrentPlayer.bind(this);
  }

  componentDidMount() {
    const url = "http://localhost:4000/players";

    axios
      .get(url)
      .then((Response) => {
        this.setState({
          players: Response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateCurrentPlayer(item) {
    this.setState({
      currentPlayer: item,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <nav className="teal darken-3">
            <div className="nav-wrapper col s12">
              <a href="/" className="brand-logo">
                <img src="favicon.ico" id="logo" alt="logo" />
                <span id="title">Soccer Management</span>
              </a>
            </div>
          </nav>
        </div>
        <div className="row">
          <div className="col s3">
            <PlayerList
              players={this.state.players}
              updateCurrentPlayer={this.updateCurrentPlayer}
            />
          </div>
          <div className="col s9">
            <PlayerSingle player={this.state.currentPlayer} />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <PlayerForm />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
