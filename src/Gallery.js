import React, {Component} from 'react';
import './App.css';
import {Card, CardMedia } from 'material-ui/Card';

class Gallery extends Component {
	constructor(props){
		super(props);
		this.state = {
			playingUrl: '',
			audio: null,
			playing: false
		}
	}

	playSound(preview){
		let audio = new Audio(preview);
		if(!this.state.playing){
			audio.play();
			this.setState({
				playing: true,
				playingUrl: preview,
				audio
			});
		}else{
			if(this.state.playingUrl === preview){
				this.state.audio.pause();
				this.setState({
					playing: false
				});
			} else{
				this.state.audio.pause();
				audio.play();
				this.setState({
					playing: true,
					playingUrl: preview,
					audio
				});
			}
		}
	}
	render(){
		const {tracks} = this.props;
		return(

				<div className="gallery">
	
				{tracks.map((track ,i ) => {
					const trackImg = track.album.images[0].url;
					return(
						 <Card key={i} className="track"
						 onClick={() => this.playSound(track.preview_url)}
						 containerStyle={{padding: 0, backgroundColor:'#212121'}}
						 style={{ }}>
					    <CardMedia  
						overlayContentStyle={{paddingBottom: '8px'}}
					    overlay={track.name} overlayStyle={{color: '#fff'}}>

					    <img src={trackImg} alt="track-img" />
					    </CardMedia>
    					
				  </Card>
						)
				})}</div>
			)
	}
}

export default Gallery;