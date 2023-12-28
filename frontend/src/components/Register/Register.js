import React from "react";
import './Register.css';
import Tilt from 'react-parallax-tilt';

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
    }
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  onSubmitSignUp = async() => {
    let user;
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
        })
      });
      user = await response.json();
    }catch(error) {
      console.log('error',error);
    }
    if(user) {
      console.log(user);
      this.props.loadUser(user);
      this.props.onRouteChange("signin")
    }
  }

  render() {
    return(
      <div className="container white">
          <Tilt>
        <h2>Register</h2>
        <div>
          <div className="form-group white">
            <p htmlFor="name" className="bold">
              Name
            </p>
            <input
              onChange={this.onNameChange}
              type="name"
              id="name"
              name="name"
              required
              />
          </div>
          <div className="form-group white">
            <p htmlFor="email" className="bold">
              Email
            </p>
            <input
              onChange={this.onEmailChange}
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="form-group white">
            <p htmlFor="password" className="bold">
              password
            </p>
            <input
              onChange={this.onPasswordChange}
              type="password"
              id="password"
              name="password"
              required
              />
          </div>
          
          <button
            onClick={this.onSubmitSignUp}
            type="submit"
            className="sign-up-button"
            
            >
            Sign up
          </button>
        </div>
        </Tilt>
      </div>
    )
  }
}

export default Register;