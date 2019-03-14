import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import "./App.css";
import BottomNav from "./BottomNav";
import Profile from "./Profile";
import Gallery from "./Gallery";

const searchStyle = {
  display: "block",
  width: 256,
  margin: "auto",
  marginTop: 20
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null,
      tracks: []
    };
  }

  search = () => {
    const BASE_URL = "https://spotify-api-wrapper.appspot.com/";
    let FETCH_URL = `${BASE_URL}/artist/${this.state.query}`;

    fetch(FETCH_URL)
      .then(response => response.json())
      .then(json => {

        if(json.artists.total > 0) {
          const artist = json.artists.items[0];
          this.setState({ artist });

          fetch(`${BASE_URL}/artist/${artist.id}/top-tracks`)
          .then(res => res.json())
          .then(json => {
            // console.log(json);
            const { tracks } = json;
            this.setState({ tracks });
          });
        }
      })
      .catch(error => {
        return alert(error.message)
      });
  };
  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          style={{
            textAlign: "left",
            backgroundColor: "#212121",
            height: 40
          }}
          title="Muse"
          showMenuIconButton={false}
        />
        <div className="search-wrapper">
          <form>
            <TextField
              hintText="Search for an artist"
              value={this.state.query}
              inputStyle={{ color: "#fff" }}
              underlineFocusStyle={{ borderColor: "#212121" }}
              onChange={e => {
                this.setState({ query: e.target.value });
              }}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  this.search();
                }
              }}
            />
            <RaisedButton
              label="Search"
              onClick={this.search}
              backgroundColor="#212121"
              labelColor="#ffffff"
              style={searchStyle}
            />
          </form>

          <Profile artist={this.state.artist} />
          <div className="">
            <Gallery tracks={this.state.tracks} />
          </div>
        </div>
        <BottomNav />
      </MuiThemeProvider>
    );
  }
}

MuiThemeProvider.propTypes = {
  children: PropTypes.array
};

export default App;
