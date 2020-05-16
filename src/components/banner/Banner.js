import React, { Component } from 'react';
import './Banner.css';

export class Banner extends Component {
    render() {
        return (
            <div className = "topnav">
                <h1><img src = "https://i.pinimg.com/originals/9e/d8/61/9ed86194c90b60ad5ce0e14fdb1b97d5.png" className = "img"></img>MovieWiki </h1>
            </div>
        )
    }
}

export default Banner
