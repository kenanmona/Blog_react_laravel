import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../../store/user/verifyEmailSlice";
import "./confirmemail.scss";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
const ConfirmEmail = () => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const expires = searchParams.get("expires");
  const signature = searchParams.get("signature");
  const [data] = useState({
    id: id,
    expires: expires,
    signature: signature,
  });

  useEffect(() => {
    console.log("render");
    dispatch(verifyEmail(data));
  }, [dispatch, data]);

  return (
    <>
      {globalState.verifyEmail.show && (
        <ul className="confirm-email">
          <li>
            {globalState.verifyEmail.icon ? (
              <SentimentSatisfiedAltIcon className="icon-success" />
            ) : (
              <SentimentDissatisfiedOutlinedIcon className="icon-faild" />
            )}
          </li>
          <li className="description">{globalState.verifyEmail.result}</li>
        </ul>
      )}
    </>
  );
};

export default ConfirmEmail;
