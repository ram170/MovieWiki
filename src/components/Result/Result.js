import React, { Component } from 'react'
import './Result.css';

export class Result extends Component {

    myfun = () => {
        debugger
    }
    render() {
        return this.props.movies.map((value, index) => 
                <div className = "grid-element-search">
                    { this.props.posters[index] !== 'N/A'?<img src = {this.props.posters[index]} className = "imgsa" onClick = { this.props.imageClick.bind(this, value) }></img> : null}
                    <br></br>
                    <br></br>
                    <span className = 'titleSearch'>{ this.props.posters[index] !== 'N/A'? value : null }</span>
                </div>
        )
    }
}

export default Result
