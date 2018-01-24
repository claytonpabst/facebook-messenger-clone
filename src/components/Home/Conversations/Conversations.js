import React, { Component } from 'react';
import axios from 'axios';

import './Conversations.css';

class Conversations extends Component {

  constructor(props){
    super(props);

    this.state = {
      conversationThreads: [],
      somethingElse: null,
      searchInput: '',
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
    // console.log(this.state);
    let conversationThreads; 
    conversationThreads = this.state.conversationThreads.length ? 
      this.state.conversationThreads.map( (item, i) => {
        let timestamp = item.timestamp.substr(5,2) + '/' + item.timestamp.substr(8,2);
        let messagePreview = item.mostrecentmessage.length >= 40
          ? 
          item.mostrecentmessage.substr(0,40) + '...'
          : 
          item.mostrecentmessage;

        return (
          <div key={i} className='thread_wrapper' onClick={() => this.props.getNewConversation(item.correspondentid)}>
            <img src={item.correspondentimageurl} alt='contact thumbnail' />
            <div>
              <p>{item.correspondentfirstname} {item.correspondentlastname}</p>
              <h1>{messagePreview}</h1>
            </div>
            <span>{timestamp}</span>
          </div>
        )
      }) 
    : <div>No Conversations</div>


    return (
      <section className='conversations'>

        <div className='search_contacts'>
          <input className='search_input' placeholder='Search Messenger' value={this.state.searchInput} onChange={(e) => this.setState({searchInput: e.target.value})} />
        </div>

        {conversationThreads}
        
      </section>

    );
  }
}


export default Conversations;