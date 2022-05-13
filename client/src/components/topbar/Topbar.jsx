import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";

export default function Topbar() {
    const { user } = useContext(AuthContext);
      const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const history = useHistory();
    const handleLogout = () => {
        localStorage.clear();
        history.push("/");
        window.location.reload();
      };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">MyWorld</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <Link to="/" >
            <div className="topbarIconItem">
                <HomeIcon />
            </div>
          </Link>
          <Link to={`/profile/${user.username}`}>
          <div className="topbarIconItem" >
                <Person />
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
          </Link>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <div className="topbarRightLinks">
            <Link to={`/profile/${user.username}`}>
            <img
                src={
                    user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noAvatar.png"
                }
                alt=""
                className="topbarImg"
                />
            </Link>
            <button className="logout" onClick={handleLogout}>
                Logout
            </button>
        </div>
      </div>
    </div>
  );
}
