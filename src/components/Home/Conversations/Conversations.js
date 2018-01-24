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
      showSearchResults: false,
      searchResults: [],
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

  handleUserInput(e){
    this.setState({
      searchInput: e.target.value
    },  this.getSearchResults)
  }

  toggleSearchResults(newVal){
    this.setState({
      showSearchResults: newVal,
      searchInput: ''
    })
    if (newVal === true){
      this.getSearchResults();
    }
  }

  getSearchResults(){
    axios.post('/api/getSearchResults', {searchInput: this.state.searchInput})
    .then( res => {
      this.setState({
        searchResults: res.data
      })
    })
    .catch( err => console.log(err))
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

    let searchResults = (
      <div className='search_results'>
        <p className='results_header'>Search Results</p>
        {
          this.state.searchResults.length ?
            this.state.searchResults.map( (item,i) => {
              return (
                <div className='result' key={i}>
                  <img src={item.imageurl} alt='contact thumbnail' className='result_img' />
                  <p className='result_p'>{item.firstname} {item.lastname}</p>
                </div>
              )
            })
          : <p style={{width: '100%', textAlign: 'center'}}>0 Results Returned</p>
        }
      </div>
    )

    return (
      <section className='conversations'>

        <div className='search_contacts'>
          <input className='search_input' placeholder='Search Messenger' value={this.state.searchInput} onChange={(e) => this.handleUserInput(e)} onFocus={() => this.toggleSearchResults(true)} onBlur={() => this.toggleSearchResults(false)} />
        </div>

        {
          this.state.showSearchResults ? 
          searchResults
          : conversationThreads
        }

      </section>

    );
  }
}


export default Conversations;