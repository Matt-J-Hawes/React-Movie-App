//DEPENDENCIES
import React from 'react';
import {NavLink} from 'react-router-dom';

//COMPONENTS
import NoResults from './NoResults'

const Movies = (props) => {
  const imagePath = 'https://image.tmdb.org/t/p/original';
	return(
		<div>
		<div className = 'movie_container'>
			{props.data.map(image => 
				<NavLink key = {image.id} to={image.id.toString()}>
					<img 
					className = 'movies'
					key={image.id} 
					src={imagePath + image.poster_path} 
					alt = {image.title}
					/>
				</NavLink>)}
			</div>
			{props.data.length === 0 ? <NoResults /> : null}
		</div> 
	);
};

export default Movies