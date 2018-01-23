import React, { Component } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';
import './Home.css';

import Header from './../Header/Header.js';
import HomeHeader from './HomeHeader/HomeHeader.js';
import Conversations from './Conversations/Conversations.js';
import CurrentConversation from './CurrentConversation/CurrentConversation.js';
import ConversationOptions from './ConversationOptions/ConversationOptions.js';


class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      devMode: true,
      text: "Home Page",
      timestamp: "no timestamp yet",
      user: {},
      currentCorrespondent: {
        friendStatus: "You're friends on Facebook",
        occupation: 'Doctor',
        location: 'Salt Lake City, Utah',
      },
    }

    //bind me
  }

  componentDidMount() {
    axios.get('/api/isLoggedIn')
    .then( res => {
      console.log(res);
      if (res.data.isLoggedIn || this.state.devMode){
        // If the user is logged in, check who their most recent conversation was with
        axios.post('/api/getMostRecentCorrespondent', {id: res.data.mostrecentcorrespondentid})
        .then( response => {
          
          let currentCorrespondent = Object.assign({}, this.state.currentCorrespondent);
          currentCorrespondent.id = response.data.id;
          currentCorrespondent.firstName = response.data.firstname;
          currentCorrespondent.lastName = response.data.lastname;
          currentCorrespondent.thumbnail = response.data.imageurl;
          
          this.setState({
            isLoggedIn: true,
            user: res.data,
            currentCorrespondent: currentCorrespondent
          })
        })
        // socket stuff
        // this.subscribeToTimer(2000, (err, timestamp) => {
        //   this.setState({
        //     timestamp: timestamp,
        //   })
        // })
      }else{
        alert('Must be logged in to view this page');

        if (window.location.href.match(/claytonpabst.com/)){
          let newUrl = window.location.href.replace(/.com\/.*/, '.com');
          window.location.href = newUrl;
        }else{
          window.location.href = 'http://localhost:3000';
        }
      }
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

        {
          (this.state.isLoggedIn || this.state.devMode) ? 
            <div>
              <Header user={this.state.user} />
              <HomeHeader user={this.state.user} currentCorrespondent={this.state.currentCorrespondent} />
              <Conversations user={this.state.user} />
              <CurrentConversation user={this.state.user} currentCorrespondent={this.state.currentCorrespondent} />
              <ConversationOptions user={this.state.user} />
            </div>
          : <div style={{fontSize: '30px'}}>Loading....</div>
        }
 
      </div>
    );
  }
}

export default Home;