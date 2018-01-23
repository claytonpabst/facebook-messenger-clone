import React, { Component } from 'react';
import axios from 'axios';
import './CurrentConversation.css';

class CurrentConversation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userInput: '',
      messages: [],
    }

    this.sendNewMessage = this.sendNewMessage.bind(this);
  }

  componentWillReceiveProps(props, prevProps){
    if (props.currentCorrespondent !== prevProps.currentCorrespondent){
      let {id} = props.currentCorrespondent;
      this.getCurrentConversation(id);
    }
  }

  getCurrentConversation(id){
    axios.post('/api/getCurrentConversation', {id})
    .then( res => {
      this.setState({
        messages: res.data
      })
    })
  }

  sendNewMessage(e) {
    //This will eventually send to the db and then request an update to the conversation.
    let key = e.keyCode || e.which;
    if (key === 13 && this.state.userInput !== '') {
      e.preventDefault();
      let messages = [...this.state.messages];
      messages.push({
        correspondent: 'Clayton Pabst',
        fromCorrespondent: false,
        message: this.state.userInput,
        date: new Date()
      });
      this.setState({
        userInput: '',
        messages: messages
      });
    }
  }

  render() {

    let messages;
    if (this.state.messages.length){
      messages = this.state.messages.map((item, i) => {
        let style = item.fromcorrespondent ?
          { float: 'left', clear: 'left', color: 'black', background: '#ccc' }
          : { float: 'right', clear: 'right', color: 'white', background: '#0084ff' };
        return (
          <div className='message' key={i}>
            <div className='float_spacer' ></div>
            <p style={style}>{item.message}</p>
          </div>
        )
      })
    }else{
      messages = null;
    }

    return (
      <section className='current_conversation'>

        <div className='conversation_wrapper'>
          <div className='correspondent_info_wrapper'>
            <img src={this.props.currentCorrespondent.thumbnail} alt='correspondent thumbnail' className='correspondent_thumbnail' />
            <div className='correspondent_info'>
              <h2>{this.props.currentCorrespondent.name}</h2>
              <h4>{this.props.currentCorrespondent.friendStatus}</h4>
              <p>{this.props.currentCorrespondent.occupation}</p>
              <p>Lives in {this.props.currentCorrespondent.location}</p>
            </div>
          </div>

          <div className='messages'>
            {messages}
          </div>
        </div>

        <form className='new_message_wrapper'>
          <textarea id='new_message_input' className='new_message_input' value={this.state.userInput} onKeyDown={this.sendNewMessage} onChange={(e) => this.setState({ userInput: e.target.value })} placeholder='Type a message...' />
        </form>

      </section>
    );
  }
}


export default CurrentConversation;