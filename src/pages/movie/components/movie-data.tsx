import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import { IconMenuBook, IconStar } from '../../../assets/icons';
import ProgressRing from '../../../components/progress-ring/progress-ring';
import Movie from '../../../models/movie';

type Props = {
    movie: Movie | undefined;
}

const MovieData = ({ movie }: Props) => {

    const darkSkeleton = {
        baseColor: "#666",
        highlightColor: "#888",
    }

    return (
        <div className="movie__data">
        <section className="movie__data__header">
            <div className="page-width">
                <div className="movie__data__header__poster">
                    {movie ? <img className="poster" src={movie.Poster} alt={movie.Title} /> : <Skeleton className="poster" width={300} height={424} {...darkSkeleton} />}
                </div>
                <div className="movie__data__header__text">
                    <h1 className="title">{movie ? movie.Title : <Skeleton {...darkSkeleton} />}</h1>
                    {movie ? (
                        <React.Fragment>
                            <div className="tags">
                                <span>Actors:</span>
                                <div className="tags__container">
                                    {movie.Actors.split(',').map(actor => (
                                        <div key={actor} className="tag">
                                            {actor}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="tags">
                                <span>Director:</span>
                                <div className="tags__container">
                                    {movie.Director.split(',').map(director => (
                                        <div key={director} className="tag">
                                            {director}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="tags">
                                <span>Year:</span>
                                <div className="tags__container">
                                    <div className="tag">{movie.Year}</div>
                                </div>
                            </div>
                        </React.Fragment>
                    ) : (
                        <Skeleton count={3} {...darkSkeleton} />
                    )}
                </div>
            </div>
        </section>
        <section className="movie__data__plot">
            <div className="page-width">
                <div className="column1">
                    <h2><IconMenuBook />Story</h2>
                </div>
                <div className="column2">
                    {movie ? (
                        <React.Fragment>
                            <b>Plot:</b><p>{movie.Plot}</p>
                            <b>Genre(s):</b><p>{movie.Genre}</p>
                            <b>Duration:</b><p>{movie.Runtime}</p>
                            <b>Writer(s):</b><p>{movie.Writer}</p>
                        </React.Fragment>
                    ) : <React.Fragment>
                        <Skeleton count={4} containerClassName="skeleton-container" />
                        <Skeleton count={2} containerClassName="skeleton-container" />
                        <Skeleton count={2} containerClassName="skeleton-container" />
                        <Skeleton count={2} />
                    </React.Fragment>}
                </div>
            </div>
        </section>
        <section className="gray movie__data__rating">
            <div className="page-width">
                <div className="column1">
                    <h2><IconStar />Ratings</h2>
                </div>
                <div className="column2">
                    {movie ? (
                        <ul className="rating-list">
                            <li>
                                <div className="key">IMDB rating:</div>
                                <div className="value"><ProgressRing progress={parseFloat(movie.imdbRating) * 10} /></div>
                            </li>
                            <li>
                                <div className="key">Metascore:</div>
                                <div className="value"><ProgressRing progress={parseInt(movie.Metascore)} /></div>
                            </li>
                            <li>
                                <div className="key">Content-rating:</div>
                                <div className="value">{movie.Rated}</div>
                            </li>
                            <li>
                                <div className="key">Awards:</div>
                                <div className="value">{movie.Awards}</div>
                            </li>
                        </ul>
                    ) : <Skeleton count={3} />}
                </div>
            </div>
        </section>
    </div>
    )
}

export default MovieData;