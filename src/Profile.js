import React, { Component } from "react";
import { Card, CardHeader } from "material-ui/Card";
import "./App.css";

const styleObj = "#fff";

class Profile extends Component {
	render() {
		let artist = null;
		artist = this.props.artist !== null ? this.props.artist : artist;
		return (
			<div>
				{artist ? (
					<Card
						className="profile"
						style={{ backgroundColor: "#212121" }}
					>
						<CardHeader
							title={artist.name}
							style={{ textAlign: "left" }}
							subtitle={`Followers: ${artist.followers.total}`}
							avatar={
								artist.images[0] ? artist.images[0].url : false
							}
							subtitleColor={styleObj}
							titleColor={styleObj}
							titleStyle={{
								textAlign: "left",
								marginBottom: "5px",
								fontSize: "15px"
							}}
						/>
					</Card>
				) : (
					false
				)}
			</div>
		);
	}
}

export default Profile;
