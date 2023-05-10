import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../css/single.css";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(false);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${`movie/${id}`}?api_key=e74cf61bff7268c55d15509b0718d7de&language=en-US&include_adult=false&`
      )
      .then((res) => {
        console.log(res.data);
        setMovie(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);
  return (
    <>
      {movie ? (
        <div className="center">
          <div className="single">
            <h2>{movie.title}</h2>
            <div className="infoCont">
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                />
              </div>
              <div className="info">
                <h3>genres:{movie.genres.map((x) => `${x.name}, `)}</h3>
                <h3>{movie.tagline}</h3>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Movie;
