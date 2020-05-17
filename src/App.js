import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/banner/Banner';
import Details from './components/details/Details';
import { Spinner } from 'react-bootstrap';

export class App extends Component {
  state = {
    title: '',
    doneLoading: true,
    error: '',
    details: '',
    shadowCss: ''
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ doneLoading: false });
    let checkval = this.check();
    if(checkval) {
      this.setState( { error: 'Enter a valid movie name' });
      this.setState( { title: '' })
      this.setState({ doneLoading: true });
       return 
    };
    this.setState( { error: '' })
    let titleString = this.constructString();
    axios.get('https://www.omdbapi.com/?apikey=3fbc69f5&t=' + titleString)  // + '&plot=full' to get full plot
    .then((res) => {
      debugger;
      if (res.data.Response === 'False') {
        this.setState( { error: 'Enter a valid movie name' });
        this.setState({ doneLoading: true });
        return
      }
      this.setState({details: res.data})
      this.setState({ doneLoading: true });
      debugger
    })
    this.setState( { title: '' })
  }

  check = () => {
    return this.state.title === '';
  }

  changeCss = (param) => {
    if(param) {
      this.setState( {shadowCss: 'shadow'} );
    }
    else {
      this.setState( {shadowCss: ''} );
    }
    debugger
  }

  constructString = () => {
    let stringArr = this.state.title.split(' ');
    let finalString = "";
    for (let i = 0; i < stringArr.length; i++) {
      debugger
      if(stringArr[i][0] !== undefined && isNaN(stringArr[i])) {
        if(i !== stringArr.length-1) {
          finalString += stringArr[i][0].toUpperCase() + stringArr[i].slice(1) + '+';
        }
        else {
          finalString += stringArr[i][0].toUpperCase() + stringArr[i].slice(1);
        }
      }
      else if(!isNaN(stringArr[i])) {
        if(i !== stringArr.length-1)
          finalString += stringArr[i] + '+';
        else
          finalString += stringArr[i];
      }
    }
    return finalString;
  }

  render() {
    return (
      <div>
        <div className = "topnav">
          <Banner changeCss = { this.changeCss }></Banner>
        </div>
        <center>{ this.state.doneLoading? null : <Spinner animation="grow" size="sm" />}</center>
        <div >
          <center>
            <span className = "error">
              { this.state.error }
            </span>
          </center>
        </div>
        {/* <br></br> */}
        {/* <hr></hr> */}
        <div className = "searchForm grid-container-main">
          <div></div>
          <div className = "grid-element">
            <form onSubmit = { this.onSubmit }>
              <input type = "text" placeholder = "Movie/Series name?" name = "title" value = {this.state.title} onChange = { this.onChange } className = "textBox"></input>
              {' '}
              <button className = "btn btn-primary">Search</button>
            </form>
          </div>
          <div></div>
        </div>
        <br></br>
        <hr></hr>
        <br></br>
        { this.state.details !== ''? <Details details = {this.state.details} cssVal = {this.state.shadowCss}></Details> : null }
      </div>
    )
  }
}

export default App

