import "./explore.css";

export default function Explore({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="explorePerson">
      <img className="explorePersonImg" src={user.profilePicture? PF+user.profilePicture : PF+ "noAvatar.png"} alt="" />
      <span className="explorePersonName">{user.username}</span>
    </li>
  );
}
