import "./css/App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Movie from "./common/movie";
import Card from "./common/Card";
import Nav from "./common/Nav";

function App() {
  let [movies, setMovies] = useState([]);
  let [page, setPage] = useState(1);
  let [search, setSearch] = useState("");
  let [selected, setSelected] = useState("");
  let [pass, setPass] = useState("");
  let [user, setUser] = useState("");
  let [logged, setLogged] = useState(false);
  let [favs, setFavs] = useState({ results: [] });
  let apiKey = "?api_key=e74cf61bff7268c55d15509b0718d7de&language=en-US&";

  const api = (action = "") =>
    `https://api.themoviedb.org/3/${action}${apiKey}`;

  let puerto = "http://localhost:3001/user";

  useEffect(() => {
    axios
      .get(api(`/discover/movie`) + `page=${page}`)
      .then((res) => setMovies(res.data))
      .catch((err) => console.error(err));
  }, [page]);

  useEffect(() => {
    if (selected)
      axios
        .get(api(`movie/${selected[1]}`))
        .then((res) => setMovies(res.data))
        .catch((err) => console.error(err));
  }, [selected]);

  useEffect(() => {
    if (search)
      axios
        .get(api("search/movie") + `query=${search}`)
        .then((res) => setMovies(res.data))
        .catch((err) => console.error(err));
  }, [search]);

  useEffect(() => {
    if (logged.favs) {
      const fetchData = async () => {
        const favsData = await Promise.all(
          logged.favs.map((x) => axios.get(api(`/movie/${x}`)))
        );
        const favsResults = favsData.map((res) => res.data);
        setFavs({ results: favsResults });
      };
      fetchData().catch((err) => console.error(err));
    }
  }, [logged.favs]);

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleUser = (e) => {
    setUser(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const handleLogOut = () => {
    setLogged(false);
    alert("deslogueado");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${puerto}/create?username=${user}&password=${pass}`)
      .then((user) => {
        if (typeof user.data == "string") alert(user.data);
        else alert("creado correctamente");
      })
      .catch((err) => console.error(err));
  };
  const handleLogin = (e) => {
    axios
      .get(`${puerto}/login?username=${user}&password=${pass}`)
      .then((user) => {
        if (typeof user.data == "string") alert(user.data);
        else setLogged(user.data);
        console.log(user.data);
      })
      .catch((err) => console.error(err));
  };

  const addFav = (e) => {
    e.preventDefault();
    if (!logged) alert("debes estar logeado para agregar a favoritos");
    else
      axios
        .post(`${puerto}/addFav/${e.target.id}?username=${logged.username}`)
        .then((user) => {
          if (typeof user.data == "string") alert(user.data);
          else setLogged(user.data);
          console.log(user.data);
        })
        .catch((err) => console.error(err));
  };

  const removeFav = (e) => {
    axios
      .delete(`${puerto}/removeFav/${e.target.id}?username=${logged.username}`)
      .then((user) => {
        if (typeof user.data == "string") alert(user.data);
        else setLogged(user.data);
        console.log(user.data);
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <Nav />
      <div>
        <form onSubmit={handleRegister}>
          <h1>crear sesion</h1>
          <input
            placeholder="username"
            value={user}
            minLength={8}
            required
            type="text"
            onChange={(e) => handleUser(e)}
          />
          <input
            placeholder="password"
            value={pass}
            minLength={8}
            required
            type="password"
            onChange={(e) => handlePass(e)}
          />
          <button>registrarse</button>
        </form>

        {logged ? (
          <button onClick={handleLogOut}>cerrar sesion</button>
        ) : (
          <button onClick={handleLogin}>iniciar sesion</button>
        )}
      </div>
      <div className="App">
        <a href="/">home</a>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelected("");
          }}
        />
        <Card movies={movies} handlers={[setSelected, addFav]} />
        <button onClick={handlePrevPage} disabled={page <= 1}>
          {"<="}
        </button>
        <button onClick={handleNextPage} disabled={!movies.results}>
          {"=>"}
        </button>
        <Movie className="seleccionada" movie={selected ? selected[0] : null} />
      </div>
      <div>
        favoritos:
        <Card movies={favs} handlers={[setSelected, removeFav]} />
      </div>
    </>
  );
}

export default App;
