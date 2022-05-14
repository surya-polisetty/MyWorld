import "./share.css";
import {PermMedia,Cancel} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

export default function Share() {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
        const storage = getStorage();
        const fileRef = ref(storage, "images/PostsImages/"+Date.now() +"::"+ file.name);
        await uploadBytes(fileRef, file).then((snapshot) => {});
        await getDownloadURL(fileRef).then((url)=>{
            newPost.img=url;
        });
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {console.log(err);}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
        <Link to={`/profile/${user.username}`}>
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? user.profilePicture
                : process.env.REACT_APP_NoAVATAR_URL
            }
            alt=""
          />
        </Link>
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="white" className="shareIcon" />
              <span className="shareOptionText">Photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
