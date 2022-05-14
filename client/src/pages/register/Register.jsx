import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const desc = useRef();
  const city = useRef();
  const relationship = useRef();

  const history = useHistory();
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const [Loading, setLoading] = useState(false);
  
  const handleClick = async (e) => {
      e.preventDefault();
      console.log(Loading);
      setLoading(true);
      console.log("1");
      if (passwordAgain.current.value !== password.current.value) {
        alert("Passwords don't match!");
      } else {
            console.log("2");
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                desc: desc.current.value,
                city: city.current.value,
                relationship: relationship.current.value,
            };
            console.log("3");
            const storage = getStorage();
            if (file1) {
                const fileRef1 = ref(storage, "images/ProfilePictures/"+Date.now() +"::"+ file1.name);
                await uploadBytes(fileRef1, file1).then((snapshot) => {});
                await getDownloadURL(fileRef1).then((url)=>{
                user.profilePicture=url;
                });
            }
            console.log("4");
            if (file2) {
                const fileRef2 = ref(storage, "images/CoverPictures/"+Date.now() +"::"+ file1.name);
                await uploadBytes(fileRef2, file2).then((snapshot) => {});
                await getDownloadURL(fileRef2).then((url)=>{
                user.coverPicture=url;
                });
            }
            console.log("5");
            try {
                await axios.post("/auth/register", user);
                setLoading(false);
                history.push("/login");
                alert("Registration Success! Please login now :)");
            } catch (err) {console.log(err);}
      }
  };

  return (
    <div className="login">
      <div className="loginWrapper">

      <div className="loginLeft">
          <h3 className="loginLogo">MyWorld</h3>
          <span className="loginDesc">
          The Internet was meant to make the world a smaller place. But it actually feels smaller without it.
          </span>
      </div>

        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Name"
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
            <input
              placeholder="Enter Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="About"
              ref={desc}
              className="loginInput"
            />
            <input
              placeholder="City"
              ref={city}
              className="loginInput"
            />
            <input
              placeholder="Relationship Status"
              ref={relationship}
              className="loginInput"
            />
            <label htmlFor="file" className="photoUpload">
                <span className="uploadQuery">Profile Photo:</span>
                {/* <PermMedia htmlColor="white" className="uploadIcon" /> */}
                <input
                    // style={{ display: "none" }}
                    type="file"
                    id="file1"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFile1(e.target.files[0])}
                />
            </label>
            <label htmlFor="file" className="photoUpload">
                <span className="uploadQuery">Cover Photo :</span>
                {/* <PermMedia htmlColor="white" className="uploadIcon" /> */}
                <input
                    // style={{ display: "none" }}
                    type="file"
                    id="file2"
                    accept=".png,.jpeg,.jpg"
                    onChange={(f) => setFile2(f.target.files[0])}
                />
            </label>
            

            <button className="loginButton" type="submit" disabled={Loading}>
              {Loading ? (
                <CircularProgress color = "white" size="20px" />
              ) : (
                "Sign Up"
              )}
            </button>

            <Link to="/login">
            <button className="loginRegisterButton">Log In</button>
            </Link>
          </form>
        </div>
      </div>

      <div className="by">
        Developed by: Surya Polisetty
      </div>
      <div className="by">
        Contact: suryampolisetty@gmail.com
      </div>
    </div>
  );
}
