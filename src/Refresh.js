import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';



class Refresh extends Component{
	constructor(props){
		super(props);
	}
	refreshPage(url) {

		window.location = url;
	}
render(){
			console.log('props',this.props)
	return(
		<div style={{marginTop: '50px',color: '#fff'}}>
		<div style={{ marginBottom: '20px'}}> Please login. </div>
			<RaisedButton 
				label="Login"
				backgroundColor='#212121'
   				labelColor='#ffffff'
				onClick={() => this.refreshPage(this.props.page)} />
		</div>
		)
	}
	}

export default Refresh