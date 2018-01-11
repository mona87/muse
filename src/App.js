import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';
import BottomNav from './BottomNav';
import Profile from './Profile';
import Gallery from './Gallery';
import Refresh from './Refresh';


const searchStyle = {
	display: 'block',
    width: 256,
    margin: 'auto',
    marginTop: 20
}

class App extends Component {
	constructor(props){
		super(props);
		this.state ={
			query: '',
			artist: null,
			accessToken: this.getAccessToken('access_token'),
			tracks: [],
			showBtn: false,
			url: 'https://pacific-brushlands-52386.herokuapp.com'
		}
//'https://pacific-brushlands-52386.herokuapp.com'
//'http://localhost:3000'
	}
	componentWillMount(){
		if(! this.state.accessToken){
			let stateKey = 'spotify_auth_state';
            var client_id = 'e188746505cb4626942c5510e1a723be';
            var redirect_uri = `${this.state.url}/callback`; 

            var state = this.generateRandomString(16);

            // localStorage.setItem(stateKey, state);
            var scope = 'user-read-private user-read-email';

            var url = 'https://accounts.spotify.com/authorize';

            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            // url += '&state=' + encodeURIComponent(state);
            window.location = url;         

        }


	}
	 generateRandomString(length) {
	 	//generate random key
	          var text = '';
	          var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	          for (var i = 0; i < length; i++) {
	            text += possible.charAt(Math.floor(Math.random() * possible.length));
	          }
	          return text;
	        };
	 getAccessToken(name, url) {
	 	//get access token from url callback
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[#]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
	search=() =>{
		const BASE_URL = 'https://api.spotify.com/v1/search?';
		let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
		const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
		const accessToken = this.state.accessToken;


		const opts = {
			method: 'GET',
			headers: {
				'Authorization' : 'Bearer ' + accessToken
			},
			mode: 'cors',
			cache: 'default'
		};

		fetch(FETCH_URL, opts)
			.then(response => response.json())
			.then(json => {

				const artist = json.artists.items[0];
				console.log('artist', artist);
				this.setState({artist});
	

			FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
			fetch(FETCH_URL, opts)
			.then(res => res.json())
			.then(json => {
				console.log(json);
				const { tracks } = json;
				this.setState({tracks});
			})

		}).catch(error => {
			console.log('err',error)
			this.setState({showBtn: true})
		});
		
	}
	render() {
		         
		return(
			<div>
			{this.state.accessToken ? 
			<MuiThemeProvider >
			  <AppBar 
			  style={{textAlign: 'left', backgroundColor: '#212121', 
			  height: 40, 
				}}
			  title="Muse" 
				showMenuIconButton={false}
			  />
			  <div className="search-wrapper">
			  <form>
			    <TextField
      				hintText="Search for an artist"
      				value={this.state.query}
      				inputStyle={{color: '#fff'}}
      				underlineFocusStyle={{borderColor:"#212121"}}
      				onChange={e => {this.setState({query: e.target.value})}}
      				onKeyPress={ e => {
      					if(e.key === 'Enter'){
      						e.preventDefault();
      						this.search();
      					}


      				}}
   				/>
   				  <RaisedButton label="Search"  
   				  onClick={this.search}
   				  backgroundColor='#212121'
   				  labelColor='#ffffff'
   				  style={searchStyle}
   				   />
   				  </form>
   				  {this.state.showBtn ?  <Refresh page={this.state.url}/> : false}
   			<Profile artist={this.state.artist} />
   				  <div className="">
   				  	<Gallery tracks={this.state.tracks}/>
   				  </div>
   			</div>
   					<BottomNav />
			  </MuiThemeProvider>

			  : false}
			  </div>
			)
	}
}

MuiThemeProvider.propTypes = {
  children: PropTypes.array
};


export default App;