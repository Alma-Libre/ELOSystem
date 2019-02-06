import React, { Component } from 'react';

function sendLogin(username, password, cb) {
	let formData = new URLSearchParams();
	formData.append('username', username);
	formData.append('password', password);
	fetch("/api/login", {
			body: formData,
			method: "post"
		})
		.then((res) => res.json())
		.then((data) => {
			cb(data);
		});
}

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {username: '',password:''};

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
		sendLogin(this.state.username, this.state.password, (data) => {
			console.log(data);
			this.props.history.push('/check');
		});
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