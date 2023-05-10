import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../common/Card";
import { useParams } from "react-router";
import { useContext } from "react";
import { LoggedContext } from "../store/loggedStore";

const Search = () => {
  const [logged, setLogged] = useContext(LoggedContext);
  const [movies, setMovies] = useState(true);
  const { search } = useParams();
  useEffect(() => {
    if (search)
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=e74cf61bff7268c55d15509b0718d7de&language=en-US&include_adult=false&` +
            `query=${search}`
        )
        .then((res) => setMovies(res.data))
        .catch((err) => console.error(err));
  }, [search]);
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
      </div>
    </>
  );
};

export default Search;
