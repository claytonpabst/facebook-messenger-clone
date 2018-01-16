import React, { Component } from 'react';
import io from "socket.io";
import { subscribeToTimer } from './../../api.js';

import './Home.css';


class Home extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      text: "Home Page",
      timestamp: "no timestamp yet"
    }



    subscribeToTimer(2000,(err, timestamp) => this.setState({ 
      timestamp 
    }));


    //bind me
  }

  // componentDidMount(){
  //   var socket = io.connect('http://127.0.0.1:8000');
  //   socket.on('connect', function(data) {
  //     socket.emit('join', 'Hello World from client');
  //   });
  // }

  render() {
    return (
      <div className="home">

          {this.state.text}
          {this.state.timestamp}

      </div>
    );
  }
}

export default Home;