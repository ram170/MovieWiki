import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/banner/Banner';
import Details from './components/details/Details';
import Result from './components/Result/Result';
import { Spinner } from 'react-bootstrap';

export class App extends Component {
  state = {
    title: '',
    doneLoading: true,
    error: '',
    details: '',
    shadowCss: '',
    options: [],
    selected: false
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
    // Your API key goes here
    .then((res) => {
      debugger;
      if (res.data.Response === 'False') {
        this.setState( { error: 'Enter a valid movie name' });
        this.setState({ doneLoading: true });
        return
      }
      this.setState({ selected: false });
      this.setState({ options: [] });
      for(let i = 0; i < res.data.Search.length; i++) { 
        let movie = this.restructureData(res.data.Search[i]);
        if (movie.poster !== 'N/A') {
          this.setState({ options: [...this.state.options, movie]});
        }
      }
      // this.setState({details: res.data});
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
    if (stringArr[stringArr.length-1] === "") {
      stringArr.pop();
    }
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

  restructureData = (data) => {
      return {
        name: data.Title,
        poster: data.Poster
      }
  }

  imgClick = (value) => {
    this.setState({ details: ''})
    this.setState({ selected: true });
    this.setState({ options: [] });
    debugger
    let titleString = this.constructString();
    // Your API key goes here
    .then((res) => {
      console.log(res);
      this.setState({details: res.data});
      this.setState({ doneLoading: true });
      debugger
    });
    this.setState( { title: '' })
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
        {/* <br></br> */}
        <hr></hr>
        {/* <br></br> */}
        <center>
        <div className = "grid-main">
        { !this.state.selected? 
          <Result movies = {this.state.options.map(value => {return value.name})} posters = {this.state.options.map(value => {return value.poster})} imageClick = {this.imgClick}></Result> 
        : null }
        </div>
        </center>
        <center>{ this.state.details === '' && this.state.selected === true? <Spinner animation="border" size="sm" /> : ''}</center>
        { this.state.details !== '' && this.state.selected? <Details details = {this.state.details} cssVal = {this.state.shadowCss}></Details> : null }
        <br></br>
      </div>
    )
  }
}

export default App

