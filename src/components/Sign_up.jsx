import "../css/sign.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sign_up = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    if (pass === cPass)
      axios
        .post(
          `http://localhost:3001/user/create?username=${user}&password=${pass}`
        )
        .then((user) => {
          if (typeof user.data == "string") alert(user.data);
          else {
            alert("creado correctamente");
            navigate("/signIn");
          }
        })
        .catch((err) => console.error(err));
    else alert("las contraseñas no coinciden");
  };

  const handleUser = (e) => {
    setUser(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const handleConfirmPass = (e) => {
    setCPass(e.target.value);
  };
  return (
    <div className="center">
      <form onSubmit={handleRegister}>
        <h2>Crear Usuario</h2>
        <input
          placeholder="username"
          onChange={handleUser}
          minLength={8}
          required
          type="text"
        />
        <input
          placeholder="password"
          onChange={handlePass}
          minLength={8}
          required
          type="password"
        />
        <input
          placeholder=" confirm password"
          onChange={handleConfirmPass}
          minLength={8}
          required
          type="password"
        />
        <button>registrarse</button>
      </form>
    </div>
  );
};

export default Sign_up;
