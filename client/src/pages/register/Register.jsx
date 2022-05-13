import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {PermMedia} from "@material-ui/icons";


export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const history = useHistory();
  const [file, setFile] = useState(null);


  const handleClick = async (e) => {
    e.preventDefault();
        const user = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            user.profilePicture = fileName;
            console.log(user);
            try {
                await axios.post("/upload", data);
            } catch (err) {}
        }
        try {
            await axios.post("/auth/register", user);
            history.push("/login");
        } catch (err) {
            console.log(err);
        } 
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MyWorld</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on MyWorld.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />

            <label htmlFor="file" className="photoUpload">
                <span className="uploadQuery">Profile Photo</span>
                <PermMedia htmlColor="white" className="uploadIcon" />
                <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </label>

            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login">
            <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
      <div className="by">
        Developed by: Surya Polisetty
      </div>
    </div>
  );
}
