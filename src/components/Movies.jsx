import { useContext, useEffect, useState } from "react";
import Card from "../common/Card";
import axios from "axios";
import { LoggedContext } from "../store/loggedStore";

const Movies = () => {
  let [movies, setMovies] = useState([]);
  let [page, setPage] = useState(1);
  const [logged, setLogged] = useContext(LoggedContext);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=e74cf61bff7268c55d15509b0718d7de&language=en-US&include_adult=false&` +
          `page=${page}`
      )
      .then((res) => {
        if (typeof res.data != "string") setMovies(res.data);
        else alert(res.data);
      })
      .catch((err) => console.error(err));
  }, [page]);
  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const addFav = (e) => {
    e.preventDefault();
    if (logged)
      axios
        .post(
          `http://localhost:3001/user/addFav/${e.target.id}?username=${logged.username}`
        )
        .then((user) => {
          if (typeof user.data == "string") alert(user.data);
          else {
            setLogged(user.data);
            alert("se ha agregado a favoritos");
          }
        })
        .catch((err) => console.error(err));
    else alert("debes estar logueado para poder usar esta funcion");
  };
  return (
    <>
      <div className="grid-center">
        <div className="grid-container">
          <Card movies={movies} handlers={addFav} />
        </div>
        <div>
          <button onClick={handlePrevPage} disabled={page <= 1}>
            {"<="}
          </button>
          <button onClick={handleNextPage} disabled={!movies.results}>
            {"=>"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Movies;
