import React, { useState } from "react";
import { useQuery } from "react-query";
import UpdateUserForm from "./UpdateUserForm";
// import ChangePassword from "./ChangePassword";
import ChangeImage from "./ChangeImage";
import { request } from "../../../services/utils/axios-utils";
import "./userProfile.scss";
import NavBar from "../../../components/layouts/user/navbar/NavBar";

const UserProfile = () => {
    const [popupProfile, setPopupProfile] = useState(false);
    const [popupPassword, setPopupPassword] = useState(false);
    const [popupImage, setPopupImage] = useState(false);

    const { data, refetch } = useQuery("user-profile", () => {
        return request({ url: "/me" });
    });

    return (
        <>
            <NavBar />
            <div className="profile-card11">
                <div className="image11">
                    <img
                        src={`${data?.data?.data?.image}`}
                        alt=""
                        className="profile-img11"
                    />
                </div>

                <div className="text-data11">
                    <span className="name11">{data?.data?.data?.name}</span>
                    <span className="email11">{data?.data?.data?.email}</span>
                </div>
                <div className="button11">
                    <button
                        className="edit11"
                        onClick={() => setPopupProfile(true)}
                    >
                        Edit Name
                    </button>
                </div>

                {popupProfile && (
                    <UpdateUserForm
                        userData={data?.data}
                        statePopup={setPopupProfile}
                        refetch={refetch}
                    />
                )}
                {/* {popupImage && (
          <ChangeImage
              userData={data?.data}
              statePopup={setPopupImage}
              refetch={refetch}
          />
      )} */}
            </div>
        </>
    );
};

export default UserProfile;
