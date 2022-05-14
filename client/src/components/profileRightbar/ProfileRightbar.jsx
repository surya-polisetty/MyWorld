import "./profilerightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ user }) {
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState();

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user._id));

        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user, currentUser]);

    const handleFollowClick = async () => {
        try {
            if (followed) {
                await axios.put(`/users/${user._id}/unfollow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put(`/users/${user._id}/follow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
            setFollowed(!followed);
        } catch (err) {
        }
    };
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton" onClick={handleFollowClick}>
                        {followed ? "Unfollow" : "Follow"}
                    </button>
                )}

                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Contact:</span>
                        <span className="rightbarInfoValue">{user.email}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship}</span>
                    </div>
                </div>

                <h4 className="rightbarTitle">Follows:</h4>
                <div className="rightbarFollowings">
                    {friends.length===0?
                        <div style={{color : "grey"}}> Not following anyone yet.</div>
                        :
                        friends.map((friend) => (
                            <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                                <div className="rightbarFollowing">
                                    <img
                                        src={
                                            friend.profilePicture
                                                ? friend.profilePicture
                                                : process.env.REACT_APP_NoAVATAR_URL
                                        }
                                        alt=""
                                        className="rightbarFollowingImg"
                                    />
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
