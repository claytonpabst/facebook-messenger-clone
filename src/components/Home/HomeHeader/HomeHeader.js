import React, { Component } from 'react';
import './HomeHeader.css';
import settingsIcon from './../../../media/settings_icon.png';
import editIcon from './../../../media/edit_icon.png';

class HomeHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    return (
      <section className='homeheader'>

        <div className='conversations_header'>
          <img src={settingsIcon} alt='settings icon' className='homeheader_icon' />
          <p>Messenger</p>
          <img src={editIcon} alt='edit icon' className='homeheader_icon' />
        </div>

        <div className='current_conversation_header'>
          <div className='current_conversation_person'>
            <p>Other person's username</p>
            <p>active 43 min ago</p>
          </div>
          <div className='current_conversation_icons_wrapper'>
            <svg ><path d="M48.3,50.5c-7.7,6.5-24.2-10-24.5-10.3C23.5,39.9,7,23.4,13.5,15.7c4.8-5.7,6.3-3.4,7-2.7
                c0.6,0.5,5.7,7.8,6,9.2c0.3,1.4-2.4,4.6-2.2,5.9c0.2,1.2,3.6,5,5.1,6.5c1.5,1.5,5.3,4.9,6.5,5.1c1.2,0.2,4.4-2.5,5.9-2.2
c1.4,0.3,8.7,5.4,9.2,6C51.6,44.2,54,45.7,48.3,50.5z"></path></svg>
          <svg ><path d="M47,27.8v7.5l9,4.5V23.2L47,27.8z M37.2,17H13.8C10.6,17,8,19.6,8,22.8v17.4c0,3.2,2.6,5.8,5.8,5.8h23.3
            c3.2,0,5.8-2.6,5.8-5.8V22.8C43,19.6,40.4,17,37.2,17z"></path></svg>
        <svg ><path d="M32,10c-12.2,0-22,9.8-22,22s9.8,22,22,22s22-9.8,22-22S44.2,10,32,10z M32,19c1.6,0,3,1.4,3,3s-1.4,3-3,3 c-1.6,0-3-1.4-3-3S30.4,19,32,19z M36,45h-2h-4h-2v-1h2V29h-2v-1h2h4v1v15h2V45z"></path></svg>
        </div>
        </div >

      </section >
    );
  }
}


export default HomeHeader;