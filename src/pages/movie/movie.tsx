import { useEffect, useState } from 'react';
import { database } from '../../utils/firebase';
import { ref, query, get, orderByChild, equalTo } from 'firebase/database';
import './movie.scss';
import { useParams } from 'react-router';
import Movie from '../../models/movie';
import { searchMovieById } from '../../utils/omdb';
import MovieData from './components/movie-data';
import { Link } from 'react-router-dom';


/**
 * PAGE
 * Shows movie data based on the IMDB-ID
 * When loading the data it shows a skeleton UI
 */
const MovieDetail = () => {
    const [movie, setMovie] = useState<Movie>();
    const [loading, setLoading] = useState<boolean>(true);
    const [notAvailable, setNotAvailable] = useState<boolean>(false);
    const { id }: { id: string } = useParams();

    /* Get movie data on mount */
    useEffect(() => {
        // NOTE: This timeout is just for testing purposes, to better show the skeleton UI
        setTimeout(() => {
            get(query(ref(database, 'movies'), orderByChild('imdbID'), equalTo(id)))
                .then(snap => {
                    if (snap.val()) {
                        const results: Movie[] = Object.values(snap.val());
                        if (results[0]) {
                            setMovie(results[0]);
                            setLoading(false);
                            return
                        }
                    }
                    getMovieFromOmdb();
                })
                .catch(error => {
                    console.error(error);
                    getMovieFromOmdb();
                })
        }, 1000)
    }, [])

    // Try to get movie data from OMDB API
    const getMovieFromOmdb = async () => {
        const result = await searchMovieById(id);
        setLoading(false);
        if (result) {
            setMovie(result);
        } else {
            setNotAvailable(true);
        }
    }

    return (
        <div className="movie">
            {(loading || movie) && (
                <MovieData movie={movie} />
            )}
            {notAvailable && (
                <div className="page-width movie__not-available">
                    <h4>Sorry, we can't find the movie you're looking for</h4>
                    <Link to='/'>Go to Hall of Fame</Link>
                </div>
            )}
        </div>
    )
}

export default MovieDetail;