import React, { Component } from 'react';
import './Details.css';

export class Details extends Component {
    ratings = () => {
        this.imdb = this.props.details.Ratings[0]? this.props.details.Ratings[0].Value: '-';
        this.rotten = this.props.details.Ratings[1]? this.props.details.Ratings[1].Value: '-';
    }
    render() {
        this.ratings();
        return (
            <div>
                <br></br>
                <div className = "container-fluid">
                    <div className = "row">
                        <div className = 'poster col-md-2'><img className = "posterImage" src = {this.props.details.Poster}/></div>
                        <div className = 'content col-md-8'>
                            <span className = "title"> {this.props.details.Title } </span>
                            {/* <span className = 'headings a'> IMDB </span> {this.props.details.Ratings[0].Value} */}
                            <br></br> <br></br>
                            <div className = "movie-details">
                                <span className = 'headings'>Genre: </span> {this.props.details.Genre} <br></br>
                                <span className = 'headings'>Plot: </span> {this.props.details.Plot} <br></br>
                                <span className = 'headings'>Director: </span> {this.props.details.Director} <br></br>
                                <span className = 'headings'>Actors: </span> {this.props.details.Actors} <br></br>
                                <span className = 'headings'>Release date: </span> {this.props.details.Released} <br></br>
                                <span className = 'headings'>Rated: </span> {this.props.details.Rated} <br></br>
                                <span className = 'headings'>Type: </span> {this.props.details.Type} <br></br>
                                <span className = 'headings'>Runtime: </span> {this.props.details.Runtime} <br></br>
                            </div>
                        </div>
                        <div className = 'col-md-2'>
                            <span className = "title"> Ratings </span>
                            <br></br> <br></br>
                            <div className = "movie-ratings">
                                <span className = 'headings'>IMDB: </span> {this.props.details.Ratings[0].Value} <br></br>
                                <span className = 'headings'>Rotten Tomatoes: </span> {this.rotten} <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details
