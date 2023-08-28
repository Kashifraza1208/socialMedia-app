import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  clearMessage,
  updatePassword,
} from "../../Actions/userAction";
import { useAlert } from "react-alert";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, alert, error, message]);

  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          className="updatePasswordInputs"
          required
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          className="updatePasswordInputs"
          required
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
