import React, { Component } from 'react';

export default class Check extends Component {
  constructor(props) {
		super(props);
		this.state = { loggedin: false };

		this.logout = this.logout.bind(this);
		
  }
  logout(event)
  {
    event.preventDefault();
    fetch('/api/logout').then(res => res.json());
    this.props.history.push('/login');

  }

  componentDidMount() {
    fetch('/api/amiloggedin')
      .then(res => res.json())
      .then(data => this.setState({ loggedin: data.loggedin }))
  }

  render() {
    const { loggedin } = this.state;
    if(loggedin)
        return (<div><h1>YOU ARE IN.</h1><button onClick={this.logout}>LOGOUT</button></div>);
    else
        return (<h1>FRICK OFF CUNT!</h1>);
  }
}
