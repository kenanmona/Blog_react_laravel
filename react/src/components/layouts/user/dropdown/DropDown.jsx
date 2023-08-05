import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import encrypt from "../../../../services/crypto/encrypt";
import { loading } from "../../../../store/user/loaderSlice";
import LoaderButton from "../../../loaderButton/LoaderButton";
import "./dropdown.scss";
const DropDown = ({ isFetching, open, data, isLoading }) => {
  const dispatch = useDispatch();

  return (
    <div className={`category-menu ${open ? "category-menu-open" : ""}`}>
      <ul className="category-link">
        {isLoading || isFetching ? (
          <li>
            <LoaderButton />
          </li>
        ) : (
          data.map((item) => {
            const encryptID = encrypt(item.id.toString());
            return (
              <NavLink
                to={`/filter/category/${encryptID}`}
                key={encryptID}
                onClick={() => {
                  dispatch(loading(""));
                }}
              >
                <li>{item.name}</li>
              </NavLink>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default React.memo(DropDown);
