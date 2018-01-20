import React, { Component } from 'react';

import './Login.css';


class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
        loginEmail:'',
        loginPassword:'',
        signupEmail:'',
        signupEmailConfirmation:'',
        signupPassword:'',
        signupPasswordConfirmation:''
    }

    this.loginButtonPressed = this.loginButtonPressed.bind(this);
  }

  loginButtonPressed(){

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
              <input placeholder="email" value={this.state.loginEmail} onChange={(e) => this.setState({ loginEmail: e.target.value })} type="text"/>  
            </span>
            <span>
              <h6>Password</h6>
              <input placeholder="password" value={this.state.loginPassword} onChange={(e) => this.setState({ loginPassword: e.target.value })} type="text"/>  
            </span>
            <button onClick={this.loginButtonPressed}>Log In</button>
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