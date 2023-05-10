import { useNavigate } from "react-router-dom";
import "../css/sign.css";
import { useContext, useState } from "react";
import { LoggedContext } from "../store/loggedStore";

import axios from "axios";
const Sign_in = () => {
  let navigate = useNavigate();
  const [logged, setLogged] = useContext(LoggedContext);
  let [pass, setPass] = useState("");
  let [user, setUser] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:3001/user/login?username=${user}&password=${pass}`)
      .then((user) => {
        if (typeof user.data == "string") alert(user.data);
        else {
          setLogged(user.data);
          alert("se ha iniciado sesion correctamente");
          navigate("/");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleUser = (e) => {
    setUser(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };
  return (
    <div className="center">
      <form onSubmit={handleLogin}>
        <h2>Bienvenido de vuelta</h2>
        <input
          placeholder="username"
          onChange={handleUser}
          minLength={8}
          required
          type="text"
        />
        <input
          placeholder="password"
          minLength={8}
          onChange={handlePass}
          required
          type="password"
        />
        <button>iniciar sesion</button>
      </form>
    </div>
  );
};

export default Sign_in;
