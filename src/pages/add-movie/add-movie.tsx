import React, { useState } from 'react';
import SearchBar from '../../components/search-bar/search-bar';
import Movie from '../../models/movie';
import { searchMovie } from '../../utils/omdb';
import './add-movie.scss';
import { database } from '../../utils/firebase';
import { set, ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

/**
 * PAGE
 * User searches a movie through the OMDB api
 * and can choose to add it to the Hall of Fame (favourites list)
 */
const AddMovie = () => {
    const history = useHistory();
    const [movie, setMovie] = useState<Movie>();
    const [alreadySelected, setAlreadySelected] = useState<boolean>(false);

    /* Handle searchbar input */
    const handleSearch = async (title: string) => {
        // if search is empty, clear state
        if (!title) {
            setMovie(undefined);
            setAlreadySelected(false);
            return
        }

        const result = await searchMovie(title);

        if (result) {
            setMovie(new Movie(result));

            get(query(ref(database, 'movies'), orderByChild('imdbID'), equalTo(result.imdbID)))
                .then(snap => {
                    setAlreadySelected(!!snap.val());
                })
                .catch(error => {
                    console.error(error);

                })
        }
    }

    /* Add movie object to Firebase database */
    const addMovie = async () => {
        if (!movie) return;
        set(ref(database, `movies/${movie.imdbID}`), movie)
            .then(res => {
                console.log('upload successful');
                const voteHistory = JSON.parse(sessionStorage.getItem("voteHistory") || '{}');
                voteHistory[movie.imdbID] = true;
                sessionStorage.setItem('voteHistory', JSON.stringify(voteHistory));
                history.push('/');
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className="page-width add-movie">
            <SearchBar onSubmit={handleSearch} />
            {movie && (
                <React.Fragment>
                    <div className="add-movie__search-result">
                        <img src={movie.Poster} alt={movie.Title} />
                        <div className="add-movie__search-result__info">
                            <h3>{movie.Title}</h3>
                        </div>
                    </div>
                    <div className="add-movie__actions">
                        <div className="add-movie__actions__buttons">
                        <Link to={`/movie/${movie.imdbID}`}>Details</Link>
                        <button disabled={alreadySelected} onClick={addMovie}>Add movie</button>
                        </div>
                        {alreadySelected && <span className="warning">This movie is already in the Hall of Fame</span>}
                    </div>
                </React.Fragment>
            )}
        </div>
    )
}

export default AddMovie;