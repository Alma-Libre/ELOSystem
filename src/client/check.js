import React, { Component } from 'react';

export default class Check extends Component {
  state = { loggedin: false };

  componentDidMount() {
    fetch('/api/amiloggedin')
      .then(res => res.json())
      .then(data => this.setState({ loggedin: data.loggedin }));
  }

  render() {
    const { loggedin } = this.state;
    if(loggedin)
        return (<h1>YOU ARE LOGGED IN.</h1>);
    else
        return (<h1>FRICK OFF CUNT!</h1>);
  }
}
