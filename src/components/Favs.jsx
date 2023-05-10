import { useContext, useEffect, useState } from "react";
import { LoggedContext } from "../store/loggedStore";
import axios from "axios";
import Card from "../common/Card";

const Favs = () => {
  const [logged, setLogged] = useContext(LoggedContext);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const fetchedMovies = [];
      if (logged.favs)
        await Promise.all(
          logged.favs.map((x) =>
            axios
              .get(
                `https://api.themoviedb.org/3/movie/${x}?api_key=e74cf61bff7268c55d15509b0718d7de&language=en-US&include_adult=false&`
              )
              .then((res) => fetchedMovies.push(res.data))
              .catch((err) => console.error(err))
          )
        );
      setMovies({ results: fetchedMovies });
    };
    getMovies();
  }, [logged.favs]);
  const removeFav = (e) => {
    axios
      .delete(
        `http://localhost:3001/user/removeFav/${e.target.id}?username=${logged.username}`
      )
      .then((user) => {
        if (typeof user.data == "string") alert(user.data);
        else {
          setLogged(user.data);
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="grid-center">
      <div className="grid-container">
        <Card movies={movies} handlers={removeFav} />
      </div>
    </div>
  );
};

export default Favs;
