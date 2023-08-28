import {
  USER_POST_FAIL,
  USER_POST_REQUEST,
  USER_POST_SUCCESS,
} from "../Constants/postConstants";
import {
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  DELETE_PROFILE_FAIL,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  FOLLOW_USER_FAIL,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_MYPOST_FAIL,
  GET_MYPOST_REQUEST,
  GET_MYPOST_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  POSTOF_FOLLOWING_FAIL,
  POSTOF_FOLLOWING_REQUEST,
  POSTOF_FOLLOWING_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "../Constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register = (name, email, password, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });

    const { data } = await axios.post(
      "/api/v1/register",
      { name, email, password, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/v1/logout");

    dispatch({ type: LOGOUT_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};
//load user

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });

    const { data } = await axios.get("/api/v1/me");

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getMyPost = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_MYPOST_REQUEST,
    });

    const { data } = await axios.get("/api/v1/my/posts");

    dispatch({
      type: GET_MYPOST_SUCCESS,
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: GET_MYPOST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//post of following user

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: POSTOF_FOLLOWING_REQUEST,
    });

    const { data } = await axios.get("/api/v1/posts");

    dispatch({
      type: POSTOF_FOLLOWING_SUCCESS,
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: POSTOF_FOLLOWING_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_USER_REQUEST,
      });

      const { data } = await axios.get(`/api/v1/users?name=${name}`);

      dispatch({
        type: ALL_USER_SUCCESS,
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: ALL_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//update password

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PASSWORD_REQUEST,
      });

      const { data } = await axios.put(
        "/api/v1/update/password",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });

    const { data } = await axios.put(
      "/api/v1/update/profile",
      { name, email, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteMyProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PROFILE_REQUEST,
    });

    const { data } = await axios.delete("/api/v1/delete/me");
    dispatch({
      type: DELETE_PROFILE_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    const { data } = await axios.post(
      "/api/v1/forgot/password",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      {
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_POST_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/userposts/${id}`);

    dispatch({
      type: USER_POST_SUCCESS,
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: USER_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_PROFILE_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/user/${id}`);

    dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FOLLOW_USER_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/follow/${id}`);

    dispatch({
      type: FOLLOW_USER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FOLLOW_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessage = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGE });
};
