import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAsyncMovieOrShowDetail, getSelectedMoviesOrShowDetail, removeSelectedMovieOrShow } from "../../features/movies/movieSlice";
import './movieDetail.scss'

const MovieDetail = () => {
    const { imdbID } = useParams();
    const dispatch = useDispatch();
    const data = useSelector(getSelectedMoviesOrShowDetail);
    useEffect(() => {
        dispatch(fetchAsyncMovieOrShowDetail(imdbID));
        return () => {
            dispatch(removeSelectedMovieOrShow())
        }
    }, [dispatch, imdbID]);
    return (
        <div className="movie-section">
            {Object.keys(data).length === 0 ?
                (<div>...Loading</div>)
                : (
                    <>            <div className="section-left">
                        <div className="movie-title">{data.Title} </div>
                        <div className="movie-rating">
                            <span>
                                IMDB Rating: {data.imdbRating}
                            </span>
                            <span>
                                IMDB Votes: {data.imdbVotes}
                            </span>
                            <span>
                                Runtime: {data.Runtime}
                            </span>
                            <span>
                                Year: {data.Year}
                            </span>
                        </div>
                        <div className="movie-plot">{data.Plot}</div>
                        <div className="movie-info">
                            <div>
                                <span>Director</span>
                                <span>{data.Director}</span>
                            </div>
                            <div>
                                <span>Stars</span>
                                <span>{data.Actors}</span>
                            </div>
                            <div>
                                <span>Generes</span>
                                <span>{data.Genre}</span>
                            </div>
                            <div>
                                <span>Languages</span>
                                <span>{data.Language}</span>
                            </div>
                            <div>
                                <span>Awards</span>
                                <span>{data.Awards}</span>
                            </div>
                        </div>
                    </div>
                        <div className="section-right">
                        </div><img src={data.Poster} alt={data.Title} />
                    </>

                )}
        </div>
    );
}

export default MovieDetail;