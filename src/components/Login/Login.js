import React, { Component } from 'react';

import './Login.css';


class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      login:{
        email:'',
        password:''
      },
      signup:{
        email:'',
        emailConfirmation:'',
        password:'',
        passwordConfirmation:''
      }
    }
  }

  render() {
    return (
      <section className='login_page'>
        <header className='login_header'>
          <div>
            <h1>facebook</h1>
          </div>
          <div style={{"paddingLeft":"100px"}}>
            <span>
              <h6>Email</h6>
              <input type="text"/>  
            </span>
            <span>
              <h6>Password</h6>
              <input type="text"/>  
            </span>
            <button>Log In</button>
          </div>
        </header>
        <div className="login_create_account_wrapper">
          <h1>Create a New Account</h1>
          <h1>It's free and always will be.</h1>
          <input type="text"/>
          <input type="text"/>
          <input type="text"/>
          <input type="text"/>
        </div>
      </section>
    );
  }
}


export default Login;