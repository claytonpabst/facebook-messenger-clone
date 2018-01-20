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
          <div className='correspondent_info_wrapper'>
            <img src='https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-1/p50x50/20106655_771138229724477_2770561463904245587_n.jpg?oh=113b7dd649105f48177516849be07701&oe=5AF5D52F' alt='correspondent thumbnail' className='correspondent_thumbnail' />
            <div className='correspondent_info'>
              <h2>Clayton Pabst</h2>
              <h4>You're friends on Facebook</h4>
              <p>New Look Pro Studios</p>
              <p>Lives in Syracuse, Utah</p>
            </div>
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