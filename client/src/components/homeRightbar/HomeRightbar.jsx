import "./homerightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function HomeRightbar() {
    const { user } = useContext(AuthContext);
    const [users,setUsers] = useState(()=>[]);
    
    useEffect(()=>{
        const getUsers = async () => {
            try {
                const usersList = await axios.get("/users/all");
                setUsers(usersList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUsers();
    },[])

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <h4 className="rightbarTitle">Explore Users</h4>
                <div className="sidebarFriendList">
                    {users.map((person) => {
                        if(person._id === user._id) return <></>;
                        else return(
                            <Link to={"/profile/" + person.username} style={{ textDecoration: "none" }}>
                                <li className="explorePerson">
                                    <img className="explorePersonImg" src={person.profilePicture? person.profilePicture : process.env.REACT_APP_NoAVATAR_URL} alt="" />
                                    <span className="explorePersonName">{person.username}</span>
                                </li>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
