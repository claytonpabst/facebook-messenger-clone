import React, { Component } from 'react';
import './CurrentConversation.css';

class CurrentConversation extends Component {

  constructor(props){
    super(props);

    this.state = {
      userInput: '',
      currentCorrespondent: {
        name: 'Clayton Pabst',
        thumbnail: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-1/p50x50/20106655_771138229724477_2770561463904245587_n.jpg?oh=113b7dd649105f48177516849be07701&oe=5AF5D52F',
        friendStatus: "You're friends on Facebook",
        occupation: 'New Look Pro Studios',
        location: 'Syracuse, Utah',
      },
      messages: [
        {
          correspondent: 'Clayton Pabst', 
          fromCorrespondent: true, 
          toCorrespondent: false,
          message: 'yo',
          date: 'Sat 01/20/2018 10:15:32 MST'
        },
        {
          correspondent: 'Clayton Pabst', 
          fromCorrespondent: false, 
          toCorrespondent: true,
          message: 'hey',
          date: 'Sat 01/20/2018 14:26:01 MST'
        },
        {
          correspondent: 'Clayton Pabst', 
          fromCorrespondent: false, 
          toCorrespondent: true,
          message: 'new one',
          date: 'Sat 01/20/2018 14:26:01 MST'
        },
      ],
    }

    this.sendNewMessage = this.sendNewMessage.bind(this);
  }

  sendNewMessage(e){
    //This will eventually send to the db and then request an update to the conversation.
    let key = e.keyCode || e.which;
    if(key === 13 && this.state.userInput !== ''){
      e.preventDefault();
      let messages = [...this.state.messages];
      messages.push({
        correspondent: 'Clayton Pabst',
        fromCorrespondent: false,
        toCorrespondent: true,
        message:this.state.userInput,
        date: new Date()
      });
      this.setState({
        userInput:'',
        messages:messages
      });
    }
  }

  componentDidMount(){
    /*
      axios to get the following and save them to state:
        - current correspondent's info
        - message history with current correspondent
    */
  }

  render() {

    let messages =this.state.messages.map( (item, i) => {
      let style = item.fromCorrespondent ? 
          {float: 'left', clear: 'left', color: 'black', background: '#ccc'} 
        : {float: 'right', clear: 'right', color: 'white', background: '#0084ff'};
        return (
          <div className='message' key={i}>
            <div className='float_spacer' ></div>
            <p style={style}>{item.message}</p>
          </div>
        )
      })

    return (
      <section className='current_conversation'>

        <div className='conversation_wrapper'>
          <div className='correspondent_info_wrapper'>
            <img src={this.state.currentCorrespondent.thumbnail} alt='correspondent thumbnail' className='correspondent_thumbnail' />
            <div className='correspondent_info'>
              <h2>{this.state.currentCorrespondent.name}</h2>
              <h4>{this.state.currentCorrespondent.friendStatus}</h4>
              <p>{this.state.currentCorrespondent.occupation}</p>
              <p>Lives in {this.state.currentCorrespondent.location}</p>
            </div>
          </div>

          <div className='messages'>
            {messages}
          </div>
        </div>

        <form className='new_message_wrapper'>
          <textarea id='new_message_input' className='new_message_input' value={this.state.userInput} onKeyDown={this.sendNewMessage} onChange={(e) => this.setState({userInput: e.target.value})} placeholder='Type a message...' />
        </form>

      </section>
    );
  }
}


export default CurrentConversation;