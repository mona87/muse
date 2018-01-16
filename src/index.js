import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import history from './history';
import App from './App';
import Login from './Login';



ReactDOM.render(
	<Router history={history} >
		<div style={{    height: '100%',
    display: 'flex',
    flexDirection: 'column'}}>
			<Route exact path="/" component={Login} />
			<Route path="/callback" component={App} />
		</div>
	</Router>, document.querySelector('#root')
);

