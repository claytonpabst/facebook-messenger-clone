import React, { Component } from 'react';
import './ConversationOptions.css';

class ConversationOptions extends Component {

  constructor(props){
    super(props);

    this.state = {

    }

  }

  componentDidMount(){
    
  }

  render() {
    let correspondent = this.props.currentCorrespondent;
    return (
      <section className='conversation_options'>

          <div className='conversation_options_top'>
            <img src={correspondent.thumbnail} alt='correspondent thumbnail' className='conversation_options_thumbnail' />
            <p>{correspondent.firstName} {correspondent.lastName}</p>
            <p className='options_small_gray'>Active 43m ago</p>
          </div>

          <div className='conversation_options_middle'>
            <p className='options_gray'>Options</p>
            <ul className='conversation_options_list'>
              <li>Search in Conversation</li>
              <li>Edit Nicknames</li>
              <li>Change Color</li>
              <li>Change Emoji</li>
              <li>Notifications</li>
            </ul>
          </div>

          <div className='conversation_options_bottom'>
            <p className='options_gray'>Facebook Profile</p>
            <p className='facebook_link'>https://facebook.com/{correspondent.firstName}{correspondent.lastName}</p>
          </div>

      </section>
    );
  }
}


export default ConversationOptions;