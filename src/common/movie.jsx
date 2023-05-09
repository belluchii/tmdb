let Movie = ({ movie }) => (
  <img src={movie ? `https://image.tmdb.org/t/p/w500/${movie}` : ""} />
);

export default Movie;
