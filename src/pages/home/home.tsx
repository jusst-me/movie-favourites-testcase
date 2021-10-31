import { useEffect, useState } from 'react';
import MovieCard from '../../components/movie-card/movie-card';
import SearchBar from '../../components/search-bar/search-bar';
import Movie from '../../models/movie';
import { database } from '../../utils/firebase';
import { cloneDeep } from 'lodash';
import { ref, get, query, orderByChild, startAt, endAt, set } from 'firebase/database'
import './home.scss';

/**
 * PAGE
 * Shows all the movies that are saved by the users
 * User can search through the titles via a search bar
 * TODO: add sorting & filtering options to movies array
 */
const Home = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [voteHistory, setVoteHistory] = useState(JSON.parse(sessionStorage.getItem('voteHistory') || "{}"));

    /* Load all the movies on mount */
    useEffect(() => {
        get(query(ref(database, 'movies'), orderByChild('date')))
            .then(snap => {
                if (snap.val()) {
                    const movies: Movie[] = Object.values(snap.val());
                    setMovies(movies)
                }
            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    /* Handle search input */
    /* TODO: performance update by filtering the state array in stead of sending new query to firebase */
    const handleSearch = (title: string) => {
        const search = title.toLowerCase()
        get(query(ref(database, 'movies'), orderByChild('searchTitle'), startAt(search), endAt(search + '\uf8ff')))
            .then(snap => {
                const movies: Movie[] = snap.val() ? Object.values(snap.val()) : [];
                setMovies(movies);
            })
            .catch(error => {
                console.error(error);
            })
    }

    /** 
     * Upvote or Downvote a movie title 
     * Vote history is saved in browser session storage to prevent double voting
     * TODO: Add authentication/login possibilities to save voting to profile data
    */
    const upVoteMovie = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string, voteCount: number) => {
        e.preventDefault();
        e.stopPropagation();

        const newVoteCount = voteHistory[id] ? voteCount - 1 : voteCount + 1;

        // update movies state
        const _movies = cloneDeep(movies);
        const i = movies.findIndex(movie => movie.imdbID === id);
        _movies[i].voteCount = newVoteCount;
        setMovies(_movies);

        // update firebase
        set(ref(database, `movies/${id}/voteCount`), newVoteCount);

        // update sessionStorage
        const _voteHistory = { ...voteHistory, [id]: !voteHistory[id] };
        sessionStorage.setItem('voteHistory', JSON.stringify(_voteHistory));
        
        // update voteHistory state
        setVoteHistory(_voteHistory);
    }

    return (
        <div className="home">
            <div className="page-width">
                <h1>Hall of Fame</h1>
                <div className="home__top-bar">
                    <SearchBar onSubmit={handleSearch} />
                </div>

                <div className="home__grid">
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <MovieCard
                                key={movie.imdbID}
                                movie={movie}
                                hasVoted={!!voteHistory[movie.imdbID]}
                                onVote={(e) => upVoteMovie(e, movie.imdbID, movie.voteCount)}
                            />
                        ))
                    ) : (
                        <p>No movies available</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home;