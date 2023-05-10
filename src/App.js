import "./css/App.css";
import { useState } from "react";
import Nav from "./common/Nav";
import { Routes, Route } from "react-router";
import Main from "./common/Main";
import Movies from "./components/Movies";
import Sign_up from "./components/Sign_up";
import Sign_in from "./components/Sign_in";
import { LoggedProvider } from "./store/loggedStore";
import Favs from "./components/Favs";
import Movie from "./components/Movie";
import Search from "./components/Search";

function App() {
  let [search, setSearch] = useState("");
  let [selected, setSelected] = useState("");
  let puerto = "http://localhost:3001/user";
  return (
    <>
      <LoggedProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search/:search" element={<Search />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/signUp" element={<Sign_up />} />
          <Route path="/signIn" element={<Sign_in />} />
          <Route path="/favs" element={<Favs />} />
        </Routes>
      </LoggedProvider>
    </>
  );
}

export default App;
