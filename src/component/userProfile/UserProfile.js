import React from "react"; // import the React library
import icon from "../../props/messageing/infocircle.png"; // import an image file
import { BsSaveFill, BsMessenger } from "react-icons/bs"; // import icons from the react-icons library
import UserSocialHandeler from "./UserSocialHandeler"; // import a custom component
import UserPhotoSection from "./photo"; // import a custom component
import "./userprofile.css"; // import css styles from a local file
import { useNavigate } from "react-router-dom"; // import a hook from the react-router-dom library
import UserPost from "../feed/userPost"; // import a custom component
import { useDispatch, useSelector } from "react-redux"; // import a hook from the react-redux library
import logoutIcon from "../../props/messageing/Logout.svg";
import { postAction } from "../../store/postStore";
import { uiStoreAction } from "../../store/UI";

function UserProfileTop() {
  const dispatch = useDispatch();
  // define a functional component
  const navigate = useNavigate(); // initialize the 'navigate' variable with a hook
  const ProfileDetails = useSelector(
    // initialize the 'ProfileDetails' variable with a hook
    (store) => store.AllPost.CurrentAccountFriends
  );

  function onLogUserOutHandeler() {
    navigate("/");
    dispatch(postAction.getCurrentAccountDetails(``));
    dispatch(uiStoreAction.setIsLogin());
  }

  const currentAccount = useSelector((store) => store.AllPost.CurrentAccount); // initialize the 'currentAccount' variable with a hook

  const userIsLogedIn = useSelector((store) => store.Ui.isLogedin);

  function onMessageUserHandeler() {
    // define a function
    if (userIsLogedIn) {
      navigate("/messenger/messages"); // call the 'navigate' function
    } else {
      navigate("/");
    }
  }

  const profileContent = ProfileDetails?.profilecontent; // use optional chaining to initialize the 'profileContent' variable

  const sameUser = currentAccount.name === ProfileDetails.name; // compare values and initialize the 'sameUser' variable

  return (
    // render some JSX
    <>
      <div className="userprofile-container">
        <div className="userprofile-coverimage">
          <img
            src="https://images.unsplash.com/photo-1608408843596-b3119736057c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdmVyJTIwcGhvdG98ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            alt="user dp"
            className="cover-image" // add a className attribute
          />
        </div>
        <div className="about-user">
          <img
            src={ProfileDetails.profileImg}
            alt="user dp"
            className="icons profilepics"
          />
          <div className="user-info">
            <h3 className="user-name">{ProfileDetails.name}</h3>
            <div className="user-otherdetails">
              <p> @{ProfileDetails.name} </p>
              <p>{profileContent?.about}</p>
            </div>
          </div>
        </div>
        <div className="message-area">
          {sameUser ? ( // use conditional rendering to display different content
            <h3 className="message btn">Edit profile</h3>
          ) : (
            <h3 className="message btn" onClick={onMessageUserHandeler}>
              <BsMessenger />
              <span>Messager</span>
            </h3>
          )}
          <BsSaveFill className="icons saved" />
          {sameUser ? (
            <img
              src={logoutIcon}
              alt="icon "
              className="icons menu-"
              onClick={onLogUserOutHandeler}
            />
          ) : (
            <img src={icon} alt="icon " className="icons menu-" />
          )}
        </div>
        {userIsLogedIn && (
          <>
            <UserSocialHandeler />
            <UserPhotoSection />
            <UserPost />
            <UserPost />
            <UserPost />
            <UserPost />
            <UserPost />
          </>
        )}
      </div>
    </>
  );
}

export default UserProfileTop; // export the component for use in other files
