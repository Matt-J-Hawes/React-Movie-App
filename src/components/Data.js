//DEPENDENCIES
import React, {Component} from 'react';
import axios from 'axios';

//COMPONENTS
import Header from './Header';
import Movies from './Movies';
import Loading from './Loading';
import apiKey from '../apiKey/config';

class Data extends Component {
  //Component State
  state = {
     data: [],
     loading: false
  }

  componentDidMount(){
    this.getMovieData()
  }

  //DEFAULT FILMS AND CONNECTION TO API
  getMovieData(query = 'star wars'){
    this.setState({loading: true}, () => {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
          .then(res => this.setState({
               data: res.data.results,
               loading: false
          })
        )
          .catch(error => console.log(error))
      });
  };


  //FORM FOR NEW FILM ON USER INPUT
  getFilms(e){
    e.preventDefault();
    const newFilm = this.newFilm.value
    if(newFilm !== ''){
       this.getMovieData(newFilm)
    };
    this.newFilm.value = ''
  };

    render(){
    return (
      <div className="App">
         <div className = 'Header'>
           <Header />
            <form onSubmit={e => this.getFilms(e)}>
               <input ref={input => this.newFilm = input} placeholder = 'The Avengers...' type="text"></input>
               <button onClick ={e => this.getFilms(e)}>&#x1F50D;</button>
            </form>
             </div>
            {this.state.loading ? <Loading /> : <Movies data = {this.state.data} />}
      </div>
    );
  };
};

export default Data;
