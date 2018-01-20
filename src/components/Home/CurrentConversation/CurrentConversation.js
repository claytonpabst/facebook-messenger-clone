import React, { Component } from 'react';
import './CurrentConversation.css';

class CurrentConversation extends Component {

  constructor(props){
    super(props);

    this.state = {
      userInput: '',
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

  }

  componentDidMount(){
    //axios to get current conversation from DB and save it to state
  }

  render() {
    return (
      <section className='current_conversation'>

        <div className='conversation_wrapper'>
          <div className='correspondent_info'>
            {/* This is where the other person info will go, their picture, their name, their Facebook info, etc */}
          </div>

          <div className='messages'>
            {
              this.state.messages.map( (item, i) => {
                let style = item.fromCorrespondent ? 
                  {float: 'left', clear: 'left', color: 'black', background: '#ccc'} 
                : {float: 'right', clear: 'right', color: 'white', background: '#0084ff'};
                return (
                  <div className='message'>
                    <div className='float_spacer' ></div>
                    <p style={style}>{item.message}</p>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className='new_message_wrapper'>
          <textarea className='new_message_input' value={this.state.userInput} onChange={(e) => this.setState({userInput: e.target.value})} placeholder='Type a message...' />
        </div>

      </section>
    );
  }
}


export default CurrentConversation;