import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import ProfileRightbar from "../../components/profileRightbar/ProfileRightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  console.log("profilestarted");
  const [user, setUser] = useState({});
  // const user = useRef();
  const username = useParams().username;
  
  useEffect(() => {
      const fetchUser = async () => {
          const res = await axios.get(`/users?username=${username}`);
          //   {console.log("setuser above" + user.username)}
          setUser(res.data);
          //   user = res.data;
          //   {console.log("setuser below" + user.username)}
          Profile();
        };
        fetchUser();
    }, [username]);

    function Profile() {
        return (
            <></>
          );
    }
    return(
        <>
        <Topbar />
        <div className="profile">
          <Sidebar />
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  className="profileCoverImg"
                  src={
                    user.coverPicture
                      ? user.coverPicture
                      : process.env.REACT_APP_NoCOVER_URL
                  }
                  alt=""
                />
                <img
                    className="profileUserImg"
                    src={
                      user.profilePicture
                        ? user.profilePicture
                        : process.env.REACT_APP_NoAVATAR_URL
                    }
                    alt=""
                />
              </div>
              <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
              </div>
            </div>
            <div className="profileRightBottom">
              <Feed username={username} />
              {(user.username!==undefined) && <ProfileRightbar user={user} />}
            </div>
          </div>
        </div>
        {console.log("profile ended "+ user.username)}
      </>
    );
}
