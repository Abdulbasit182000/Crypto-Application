import MovieListing from "./../movieListing/movieListing";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncMovies, fetchAsyncShows } from "../../features/movies/movieSlice";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncMovies())
        dispatch(fetchAsyncShows());
    },[dispatch]);
    return ( 
        <div className="home">
            <div className="banner-img">
                <MovieListing/>
            </div>
        </div>
     );
}
 
export default Home;