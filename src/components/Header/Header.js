import React, { Component } from 'react';
import './Header.css';

import facebookLogo from './../../media/facebook_logo.png';
import magnifyingGlass from './../../media/magnifying_glass.png';

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
    }

    this.updateSearchInput = this.updateSearchInput.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  updateSearchInput(e){
    this.setState({
      searchInput: e.target.value
    })
  }

  render() {
    return (
      <section className='header'>
        <div className='header_inner'>

          <div className='facebook_search_container'>
            <div className='facebook_logo_wrapper'>
              <img src={facebookLogo} alt='facebook logo' className='facebook_logo' />
            </div>
            <input className='header_search' placeholder='Search' value={this.state.searchInput} onChange={this.updateSearchInput} />
            <div className='header_search_btn'>
              <img className='header_search_btn_icon' src={magnifyingGlass} alt='search magnifying glass' />
            </div>
          </div>

          <div className='header_controls_wrapper'>
            <ul className='header_navlist'>
              <li className='header_thumbnail_wrapper'>
                <img className='header_thumbnail' src={this.props.user.imageurl || 'http://www.kogentsurgical.com/static/images/productImages/default-thumbnail.png'} alt='user thumbnail' />
                <p className='header_username'>{this.props.user.firstname || 'Username'}</p>
              </li>
              <li className='header_navlist_home'>Home</li>
              <li>Find Friends</li>
            </ul>
          </div>

        </div>
      </section>
    );
  }
}


export default Header;