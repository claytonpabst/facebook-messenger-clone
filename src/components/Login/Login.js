import React, { Component } from 'react';
import axios from 'axios';

import './Login.css';


class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
        loginEmail:'claytonpabst@gmail.com',
        loginPassword:'claytonpabst@gmail.com',
        firstName:'',
        lastName:'',
        signupEmail:'',
        signupEmailConfirmation:'',
        signupPassword:'',
        signupPasswordConfirmation:''
    }

    this.loginButtonPressed = this.loginButtonPressed.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
  }

  handleInput(e, variable){
    this.setState({
      [variable]:e.target.value
    })
  }

  loginButtonPressed(){
    axios.post('/api/login', {email:this.state.loginEmail, password:this.state.loginPassword})
    .then( res => {
      // console.log(res);
      if (res.data.isLoggedIn){
        let newUrl = window.location.href + 'messages';
        window.location.href = newUrl;
      }else{
        return alert('Invalid email or password');
      }
    })
  }

  createNewUser(){
    if(this.state.signupEmail === this.state.signupEmailConfirmation && this.state.signupPassword === this.state.signupPasswordConfirmation){
      axios.post('/api/createNewUser', {firstName:this.state.firstName,
                                        lastName:this.state.lastName,
                                        email:this.state.signupEmail,
                                        password:this.state.signupPassword})
      .then(res => {
        alert(res.data.message);
        if (res.data.success){
          let newUrl = window.location.href + 'messages';
          window.location.href = newUrl;
        }
      })                                  
    } else {
      alert("Email or password fields don't match");
    }
  }

  render() {
    // console.log(this.state);
    return (
      <section className='login_page'>
        <header className='login_header'>
          <div>
            <h1>facebook</h1>
          </div>
          <div style={{"paddingLeft":"100px"}}>
            <span>
              <h6>Email</h6>
              <input placeholder="Email" value={this.state.loginEmail} onChange={(e) => this.setState({ loginEmail: e.target.value })} type="text" autoFocus />  
            </span>
            <span>
              <h6>Password</h6>
              <input placeholder="Password" value={this.state.loginPassword} onChange={(e) => this.setState({ loginPassword: e.target.value })} type="text"/>  
            </span>
            <button onClick={this.loginButtonPressed}>Log In</button>
          </div>
        </header>
        <div className="login_create_account_wrapper">
          <h1>Create a New Account</h1>
          <h1>It's free and always will be.</h1>
          <input placeholder="First Name" value={this.state.firstName} onChange={(e) => this.handleInput(e,"firstName")} type="text"/>
          <input placeholder="Last Name" value={this.state.lastName} onChange={(e) => this.handleInput(e,"lastName")} type="text"/>
          <br/>
          <input style={{"width":"425px"}} placeholder="Email" value={this.state.signupEmail} onChange={(e) => this.handleInput(e,"signupEmail")} type="text"/>
          <br/>
          <input style={{"width":"425px"}} placeholder="Confirm Email" value={this.state.signupEmailConfirmation} onChange={(e) => this.handleInput(e,"signupEmailConfirmation")} type="text"/>
          <br/>
          <input style={{"width":"425px"}} placeholder="Password" value={this.state.signupPassword} onChange={(e) => this.handleInput(e,"signupPassword")} type="text"/>
          <br/>
          <input style={{"width":"425px"}} placeholder="Confirm Password" value={this.state.signupPasswordConfirmation} onChange={(e) => this.handleInput(e,"signupPasswordConfirmation")} type="text"/>
          <button onClick={this.createNewUser}>Create Account</button>
        </div>
      </section>
    );
  }
}


export default Login;