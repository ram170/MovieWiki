import React, { Component } from 'react';
import './Banner.css';
import Switch from '@material-ui/core/Switch';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStayIcon from '@material-ui/icons/NightsStay';

export class Banner extends Component {
    state = {
        checked: false
    }

    toggleChecked = () => {
        debugger
        this.setState({checked: !this.state.checked});
        document.body.style.backgroundColor = this.state.checked? 'white':'black';
        document.body.style.color = this.state.checked? 'black':'white';
        debugger
        this.props.changeCss(!this.state.checked);
        debugger
    }
    render() {
        return (
            <div>
            <div className = "topnav grid-container-main">
                <div></div>
                <div className = "mainText">
                    <h1><img src = "https://i.pinimg.com/originals/9e/d8/61/9ed86194c90b60ad5ce0e14fdb1b97d5.png" className = {!this.state.checked? "img" : "invertImg"}></img>MovieWiki</h1>
                </div>
                <div> </div>
            </div>
            <div>
                <span className = "switch">
                <WbSunnyIcon />
                <Switch size="small" checked={this.state.checked} onClick={this.toggleChecked} label="Secondary"/>
                <NightsStayIcon />
                </span>
            </div>
            </div>
        )
    }
}

export default Banner
