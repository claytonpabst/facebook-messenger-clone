import React, { Component } from 'react';
import axios from 'axios';

import './Conversations.css';

class Conversations extends Component {

  constructor(props){
    super(props);

    this.state = {
      conversationThreads: [],
      somethingElse: null
    }

  }

  componentDidMount(){
    axios.get('/api/getConversationThreads')
    .then( res => {
      // console.log(res.data);
      this.setState({
        conversationThreads: res.data
      })
    })
  }

  render() {
    console.log(this.state);
    let conversationThreads; 
    conversationThreads = this.state.conversationThreads.length ? 
      this.state.conversationThreads.map( (item, i) => {
        let timestamp = item.timestamp.substr(5,2) + '/' + item.timestamp.substr(8,2);
        return (
          <div key={i} className='thread_wrapper'>
            <img src={item.correspondentimageurl} alt='contact thumbnail' />
            <div>
              <p>{item.correspondentfirstname} {item.correspondentlastname}</p>
              <h1>{item.mostrecentmessage}</h1>
            </div>
            <span>{timestamp}</span>
          </div>
        )
      }) 
    : <div>No Conversations</div>


    return (
      <section className='conversations'>
        {conversationThreads}
      </section>
    );
  }
}


export default Conversations;