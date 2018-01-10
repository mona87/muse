import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import './App.css';

const styleObj = '#fff'

class Profile extends Component {

	render(){
		let artist = null;
			artist = this.props.artist !== null ? this.props.artist : artist;
		return(
				<div>
				{ artist ? 
				 <Card
				 className="profile"
				 style={{ backgroundColor:'#212121'}}
				 >
				    <CardHeader
				      title={artist.name}
				      style={{textAlign: 'left'}}
				      subtitle={`Spotify Followers: ${artist.followers.total}`}
				      avatar={artist.images[0].url}
				      subtitleColor={styleObj}
				      titleColor={styleObj}
				      titleStyle={{ textAlign: 'left', marginBottom: '5px', fontSize: '15px'}}

				    />
	

				  </Card>

				  : false}
		
				</div>
			)
	}
}

/*
			    <CardText
				    color={styleObj}
				    >
				    	{artist.genres.map((genre, i) => {
				    		genre = genre !== artist.genres[artist.genres.length - 1] ? `${genre}, ` : ` & ${genre};`
			    		return <span key={i}>{genre}</span>
				    	})}
				    </CardText>

				    */

export default Profile;