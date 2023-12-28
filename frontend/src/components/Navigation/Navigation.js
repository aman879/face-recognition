import React from 'react';
import Tilt from 'react-parallax-tilt';
import logo from './logo.png';
import './Logo.css';

const Navigation = ({route, onRouteChange, isSignedIn}) => {

            if(isSignedIn) {
                return (
                    <nav className='navigation'>
                        <div className='logo-container'>
                            <Tilt>
                                <img className="logo-img" alt='spiderman-logo' src={logo}></img>
                            </Tilt>
                        </div>
                        <div>
                        <div className='sign-out-container' style={{display:'flex', justifyContent: 'flex-end'}}>
                            <p onClick={() => onRouteChange('signout')} className='f3 link dim red pa3 pointer'>sign Out</p>
                        </div>
                        </div>
                    </nav>
                    )
            } else {
                return(
                    <nav className='navigation'>
                        <div className='logo-container'>
                            <Tilt >
                                <img className="logo-img" alt='spiderman-logo' src={logo}></img>
                            </Tilt>
                        </div>
                        <div className='sign-out-container' style={{display:'flex', justifyContent: 'flex-end'}}>
                            {route === 'register'? (
                                <p onClick={() => onRouteChange('signin')} className='f3 link dim red pa3 pointer'>sign In</p>
                                ): (
                                <p onClick={() => onRouteChange('register')} className='f3 link dim red pa3 pointer'>Register</p>
                            )}
                        </div>
                </nav>
                )
            }
}

export default Navigation;