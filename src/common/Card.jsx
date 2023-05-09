let Card = ({ movies, handlers }) => (
  <>
    {movies.results &&
      movies.results.map((movie, x) => (
        <div key={x || 100}>
          <button
            onClick={(e) => {
              handlers[0]([e.target.className, e.target.id]);
            }}
            className={movie.poster_path}
            id={movie.id}
          >
            {movie.title}
          </button>
          <button
            id={movie.id}
            onClick={(e) => {
              handlers[1](e);
            }}
          >
            ♥
          </button>
        </div>
      ))}
  </>
);

export default Card;
