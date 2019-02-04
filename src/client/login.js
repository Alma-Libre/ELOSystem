import React, { Component } from 'react';
// import axios from 'axios';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {username: '',password:'',redirectTo:''};

		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUsername(event) {
		this.setState({username: event.target.value});
	}
	handlePassword(event) {
		this.setState({password: event.target.value});
	}

	handleSubmit(event) {
		//alert('Username is ' + this.state.username + ' Password is' + this.state.password);
		event.preventDefault();
		this.props.history.push('/');
		// axios.post('/authenticate',{
		// 	username: this.state.username,
		// 	password: this.state.password 
		// })
		// .then(res => {
		// 	if(res.data){
		// 		console.log("user-signed-in");
		// 		this.setState({redirectTo:'/login'});
		// 	}
		// 	else{
		// 		console.log("Sign-In Error");
		// 	}
		// }).catch(err => {
		// 		console.log("Server-Side Error");
		// })
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Username:
					<input type="text" value={this.state.username} onChange={this.handleUsername} />
				</label>
				<br/>
				<br/>
				<label>
					Password:
					<input type="text" value={this.state.password} onChange={this.handlePassword} />
				</label>
				<br/>
				<br/>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}