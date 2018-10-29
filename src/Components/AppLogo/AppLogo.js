import React, { Component } from 'react';
import Logo from './MEETUPLOGO.png'

class AppLogo extends Component {
    render() {
        return (
            <div>
                
                <img src={Logo} class="img-responsive" alt="Image"/>
                
            </div>
        );
    }
}

export default AppLogo;