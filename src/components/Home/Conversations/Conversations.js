import React, { Component } from 'react';
import './Conversations.css';

class Conversations extends Component {

  constructor(props){
    super(props);

    this.state = {
      contacts: [
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
    // axios call to get a list of all of the user's active conversations.
    // When a new contact is clicked on, we need to make an axios call to update the user's mostrecentcorrespondentid info in their database
  }

  render() {
    return (
      <section className='conversations'>
        {
          this.state.contacts.map( (item, i) => {
            return (
              <div key={i} className='contact_wrapper'>
                <img src={item.imageUrl} alt='contact thumbnail' />
                <p>{item.firstName} {item.lastName}</p>
                <p>{item.date}</p>
                <p>{item.mostRecentMessage}</p>
              </div>
            )
          })
        }
      </section>
    );
  }
}


export default Conversations;