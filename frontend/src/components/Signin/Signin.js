import React from 'react';
import './SignIn.css';
import Tilt from 'react-parallax-tilt';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail:'',
      signInPassword:''
    }
  }
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }
  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmitSignIn = async() => {
    let responseData;
    try {
      const response = await fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword
        })
      })
      responseData = await response.json();
    } catch(error) {
      console.log('error',error);
    }
    if(responseData.id) {
      this.props.loadUser(responseData);
      this.props.onRouteChange('home');
    }
  }

  render() {
    return(
      <div className="container white">
          <Tilt>
        <h2>Sign In</h2>
        <div>
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
            onClick={this.onSubmitSignIn}
            type="submit"
            className="sign-in-button"
            >
            Sign In
          </button>
        </div>
        </Tilt>
      </div>
    )
  }
}

export default Signin;
