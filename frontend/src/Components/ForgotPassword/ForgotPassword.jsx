import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import "./ForgotPassword.css";
import { clearErrors, forgotPassword } from "../../Actions/userAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../Actions/postAction";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const alert = useAlert();
  const { error, loading, message } = useSelector((state) => state.like);
  //   const { message } = useSelector((state) => state.like);

  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
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
  }, [alert, error, dispatch, message]);

  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={forgotPasswordHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <input
          type="email"
          placeholder="Email"
          required
          className="forgotPasswordInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="submit" disabled={loading}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
