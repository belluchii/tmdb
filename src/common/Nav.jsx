import { Link, useNavigate } from "react-router-dom";
import "../css/Nav.css";
import { useContext } from "react";
import { LoggedContext } from "../store/loggedStore";

const Nav = () => {
  let navigate = useNavigate();
  const [logged, setLogged] = useContext(LoggedContext);
  const handleLogOut = () => setLogged(false);
  const handleSearch = (e) => {
    if (e.target.value) navigate(`search/${e.target.value}`);
  };
  return (
    <nav>
      <ul>
        <li>
          <Link to="">
            <p className="inicio">Inicio</p>
          </Link>
        </li>
        <li>
          <Link to="movies">
            <p className="inicio">Movies</p>
          </Link>
        </li>
        {logged ? (
          <li>
            <Link to="favs">
              <p className="inicio">Favorites</p>
            </Link>
          </li>
        ) : (
          ""
        )}
        <li className="login">
          <input
            type="text"
            placeholder="search"
            onChange={(e) => handleSearch(e)}
          />

          {!logged ? (
            <>
              <Link to="/signIn">
                <p>Sign in</p>
              </Link>
              <Link to="/signUp">
                <p className="signUp">Sign up</p>
              </Link>
            </>
          ) : (
            <>
              <Link to="" onClick={handleLogOut}>
                <p>Log out</p>
              </Link>
              <p className="signUp">{logged.username}</p>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
