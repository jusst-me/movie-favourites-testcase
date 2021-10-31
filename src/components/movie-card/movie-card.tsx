import { Link } from "react-router-dom";
import { IconFavoriteFull, IconFavoriteOutline } from "../../assets/icons";
import Movie from "../../models/movie";
import './movie-card.scss';

type Props = {
    movie: Movie;
    onVote: (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    hasVoted: boolean;
}

const MovieCard = ({ movie, onVote, hasVoted }: Props) => {
    return (
        <Link className="movie-card" to={`/movie/${movie.imdbID}`}>
            <div className="movie-card__poster">
                <img src={movie.Poster} alt={movie.Title} />
                <div className="movie-card__poster__vote-count" onClick={onVote}>
                    {hasVoted ? <IconFavoriteFull /> : <IconFavoriteOutline />}{movie.voteCount}
                </div>
            </div>
            <div className="movie-card__text">
                <h4>{movie.Title}</h4>
                <p>{movie.Genre}</p>
            </div>
        </Link>
    )
}

export default MovieCard;