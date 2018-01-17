import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { subscribeToTimer } from './../../api.js';
import './Home.css';


class Home extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      text: "Home Page",
      timestamp: "no timestamp yet"
    }
    
    //bind me
  }

  componentDidMount(){
    this.subscribeToTimer(2000, (err, timestamp) => {
      this.setState({
        timestamp: timestamp
      })
    })
  }

  subscribeToTimer(interval, cb) {
    const socket = openSocket('http://localhost:8085');
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', interval);
  } 

  render() {
    return (
      <div className="home">

          {this.state.text}
          <p>{this.state.timestamp}</p>

      </div>
    );
  }
}

export default Home;