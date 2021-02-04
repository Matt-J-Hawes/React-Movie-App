//DEPENDENCIES
import React, {Component} from 'react';
import axios from 'axios';

//COMPONENTS
import Loading from './Loading'
import apiKey from '../apiKey/config'

class Movie extends Component {
	//Component State
	state = {
		movie: [],
		release: [],
		genres: [],
		cast: [],
		loading: false
	};

	componentDidMount(){
		this.getMovieInfo()
		this.getMovieCredits()
	};

    //GET MOVIE ID BASED ON QUERY STRING
	getMovieInfo(query = window.location.pathname.slice(1)){
		this.setState({loading: true}, () => {
			axios.get(`https://api.themoviedb.org/3/movie/${query}?api_key=${apiKey}`)
			  .then(res => this.setState({
			  	   movie: res.data,
			  	   release: res.data.release_date.slice(0,4),
			  	   genres: res.data.genres,
			  	   loading: false
			  })
		   )
			  .catch(error => console.log(error))
		});
	};

    //GET MOVIE CREDITS FROM ALTERED URL
	getMovieCredits(query = window.location.pathname.slice(1)){
		this.setState({loading: true}, () => {
		axios.get(`https://api.themoviedb.org/3/movie/${query}/credits?api_key=${apiKey}&language=en-US`)
		   .then(res => this.setState({cast: res.data.cast, loading: false}))
		   .catch(error => console.log(error))
		})
	};

	render(){
		const imagePath='https://image.tmdb.org/t/p/original';
		return (
			<div>
			{this.state.loading ? <Loading /> : 
			<div>
				<div className='header'>
			       <h1>{this.state.movie.original_title}</h1>
				</div>
				   <p className='release_date'>({this.state.release})</p>
		   		<div className='movie_overview'>
				   <img 				     
				     alt = {this.state.movie.original_title} 
				     src = {imagePath + this.state.movie.poster_path} 
				     />
				    <p className='desc'>
			          {this.state.movie.tagline ? 
			          	<span className="tagline">"{this.state.movie.tagline}"<br/><br/><br/></span> 
			          	: null}
				      {this.state.movie.overview}				
                      <br/><br/><br/>
                      {this.state.genres.map(genre => <span key={genre.id}>{genre.name} </span>)}
			        </p>
			        <p className='rating'>{Number.parseFloat(this.state.movie.vote_average).toFixed(1)}</p>
		       </div>
		         {this.state.movie.backdrop_path ? 
			         <div className = 'backdrop' style = {{
				     	backgroundImage: `url(${imagePath}${this.state.movie.backdrop_path})`}}>
				     	<p className = 'hidden'> Movie App </p>
				     </div> : null
			     }
			     {this.state.cast.length ? 
				     <div className = 'cast_list zero'>
				            <h2>Cast</h2>
				            <hr />
				     </div> : null
			     }
		         <div className = 'cast_list one'>
		           {this.state.cast.slice(0,1).map(name => 
			         	<h2 key ={name.id} className = "actors">{name.original_name} - 
			         	 <span key ={name.id} className= 'characters'> {name.character} </span>
			         	</h2>)}
		         </div> 
		         <div className = 'cast_list two'>
		            {this.state.cast.slice(1,3).map(name => 
			         	 <h4 key ={name.id} className = "actors">{name.original_name} - 
			         	 <span key ={name.id} className= 'characters'> {name.character}</span>
			         	 </h4>)}
		         </div>
		         <div className = 'cast_list three'>
		            {this.state.cast.length > 3 ? 
			         	 this.state.cast.slice(3, this.state.cast.length).map(name => 
						 <p key ={name.id} className = "actors">{name.original_name} - 
			         	 <span key ={name.id} className= 'characters'> {name.character}</span>
			         	 </p> ) : null}
		         </div> 
		         </div> }
		     </div>	             
		);
	};
};

export default Movie;