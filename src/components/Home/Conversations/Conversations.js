import React, { Component } from 'react';
import axios from 'axios';

import './Conversations.css';

class Conversations extends Component {

  constructor(props){
    super(props);

    this.state = {
      conversationThreads: [
        {
          imageUrl: 'https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-1/p24x24/1913953_1539741286351693_7720842032649839245_n.jpg?oh=79d21aee4236dc38bcbfc89e1ec8485a&oe=5B21B8C6',
          id: 2,
          firstName: 'Clayton',
          lastName: 'Pabst',
          mostRecentMessage: 'hello',
          date: 'Sat'
        },
        {
          imageUrl: 'https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-1/p24x24/1913953_1539741286351693_7720842032649839245_n.jpg?oh=79d21aee4236dc38bcbfc89e1ec8485a&oe=5B21B8C6',
          id: 2,
          firstName: 'Kent',
          lastName: 'Garfield',
          mostRecentMessage: 'howdy',
          date: 'Sat'
        }
      ]
    }

  }

  componentDidMount(){
    axios.get('/api/getConversationThreads')
    .then( res => {
      this.setState({
        conversationThreads: res.data
      })
    })
  }

  render() {
    let conversationThreads; 
    conversationThreads = this.state.conversationThreads.length ? 
      this.state.conversationThreads.map( (item, i) => {
        return (
          <div key={i} className='thread_wrapper'>
            <img src={item.imageUrl} alt='contact thumbnail' />
            <div>
              <p>{item.firstName} {item.lastName}</p>
              <h1>{item.mostRecentMessage}</h1>
            </div>
            <span>{item.date}</span>
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