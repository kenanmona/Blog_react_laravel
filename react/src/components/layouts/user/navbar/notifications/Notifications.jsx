import React from "react";
import { Link } from "react-router-dom";
import "./notifications.scss";
import CloseIcon from "@mui/icons-material/Close";
import { loading } from "../../../../../store/user/loaderSlice";
import { useSelector } from "react-redux";
import encrypt from "../../../../../services/crypto/encrypt";

const Notifications = ({
  closeNotification,
  setCloseNotification,
  dispatch,
}) => {
  // const [close, setClose] = useState(false);
  const globalState = useSelector((state) => state);

  return (
    <div className={`notifications-user ${closeNotification}`}>
      <h2 className="notifications-title">
        Notifications
        <CloseIcon
          className="notifications-close"
          onClick={() =>
            closeNotification === ""
              ? setCloseNotification("open-notes")
              : setCloseNotification("")
          }
        />
      </h2>
      <div className="notifications-container">
        {globalState.notification.notifications?.map((note) => {
          const encriptID = encrypt(note.id.toString());
          return (
            <div key={encriptID} className="notification-content">
              <Link
                to={`/details/${encriptID}`}
                className="url-notification"
                onClick={() => dispatch(loading(""))}
              >
                {note.message}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
