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
import history from './history';



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
		}
	}
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
				// console.log('artist', artist);
				this.setState({artist});
	

			FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
			fetch(FETCH_URL, opts)
			.then(res => res.json())
			.then(json => {
				// console.log(json);
				const { tracks } = json;
				this.setState({tracks});
			})

		}).catch(error => {

			   history.push('/');
			// console.log('err',error)
			// this.setState({showBtn: true})
		});
		
	}
	render() {
		         
		return(

		
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
   				
   				<Profile artist={this.state.artist} />
   				  <div className="">
   				  	<Gallery tracks={this.state.tracks}/>
   				  </div>
   				</div>
   				<BottomNav />
			  </MuiThemeProvider>

	
		
			)
	}
}

MuiThemeProvider.propTypes = {
  children: PropTypes.array
};


export default App;