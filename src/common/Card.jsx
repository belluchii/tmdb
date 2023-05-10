import { Link } from "react-router-dom";
let Card = ({ movies, handlers }) => (
  <>
    {movies && movies.results ? (
      movies.results.map((movie, x) => (
        <div key={x || 100} className="grid-item">
          <Link className="Links" to={`/movies/${movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          </Link>
          <button
            id={movie.id}
            onClick={(e) => {
              handlers(e);
            }}
          >
            ♥
          </button>
        </div>
      ))
    ) : (
      <h1>No hay contenido</h1>
    )}
  </>
);

export default Card;
