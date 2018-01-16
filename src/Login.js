import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import BottomNav from './BottomNav';

class Login extends Component{
	constructor(){
		super();
		this.state = {
			base_url: 'http://localhost:3000',
			url: ''
		}
		//'https://pacific-brushlands-52386.herokuapp.com'
		//'http://localhost:3000'
	}
	componentWillMount(){

			const stateKey = 'spotify_auth_state';
            const client_id = 'e188746505cb4626942c5510e1a723be';
            const redirect_uri = `${this.state.base_url}/callback`; 

            const state = this.generateRandomString(16);

            localStorage.setItem(stateKey, state);
            const scope = 'user-read-private user-read-email';

            let url = 'https://accounts.spotify.com/authorize';

            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            url += '&state=' + encodeURIComponent(state);
            console.log('url',url)
            this.setState({url})

   //          window.location = url;  
	}
	generateRandomString(length) {
	 	//generate random key
	          var text = '';
	          var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	          for (var i = 0; i < length; i++) {
	            text += possible.charAt(Math.floor(Math.random() * possible.length));
	          }
	          return text;
	}
	render() {
		console.log(this.state.url)
		return(
			<MuiThemeProvider>
			  <AppBar 
			  style={{textAlign: 'left', backgroundColor: '#212121', 
			  height: 40, 
				}}
			  title="Muse" 
				showMenuIconButton={false}
				iconElementRight={					
	   				<FlatButton 
	   					label="Login" 			
   				  		onClick={() => {window.location = this.state.url}}  		
	   					style={{color:'#fff', lineHeight: '25px', height: '25px', marginTop: '0px'}}
	   					/>
	   				}
			  />

			<RaisedButton
				label="Login with Spotify"
				className="login-btn" 
				style={{display: 'block', margin: 'auto', width: '200px'}} 
   				  onClick={() => {window.location = this.state.url}}
   				  backgroundColor='#212121'
   				  labelColor='#ffffff'
			></RaisedButton>
			<BottomNav bottomPos='0px' />
		</MuiThemeProvider>
		)
	}
}

export default Login;