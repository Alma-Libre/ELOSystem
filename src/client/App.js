import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  state = { data: null };

  componentDidMount() {
    fetch('/api/getusers')
      .then(res => res.json())
      .then(data => this.setState({ data: data }));
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        {data ? <h1>{`Hello ${data[0]['username']}`}</h1> : <h1>Loading.. please wait!</h1>}
      </div>
    );
  }
}
