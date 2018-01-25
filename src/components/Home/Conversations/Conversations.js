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

    this.toggleSearchResults = this.toggleSearchResults.bind(this);
    this.startNewConversation = this.startNewConversation.bind(this);
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
    if (newVal){
      // If we are setting newVal to true, we want to get search results from DB and show them
      this.setState({
        showSearchResults: true,
        searchInput: ''
      })
      this.getSearchResults();
    }else{
      // Otherwise, hide the search results. The 200 ms timeout allows someone to click on a search result
      // to start a new conversation thread before the search results lose focus and disappear
      setTimeout( () => {
        this.setState({
          showSearchResults: false,
          searchInput: ''
        })
      }, 200)
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

  startNewConversation(userInfo){
    console.log(userInfo);
    /* 
      Database call here:
        - If user clicks on their own name, maybe we can do nothing?
        - If they click on someone they already have a conversation with, we need to move that one to the top
        - If it's a new contact, we need to create that new conversation
    */
    axios.post('/api/startNewConversation', userInfo)
      .then( res => {
        console.log(res);
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
                <div className='result' key={i} onClick={() => this.startNewConversation(item)}>
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