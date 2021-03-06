import axios from 'axios'
import { ORDER_MY_LIST_RESET } from '../constants/orderConstants'
import {
  USERS_LIST_FAIL,
  USERS_LIST_REQUEST,
  USERS_LIST_RESET,
  USERS_LIST_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_ASADMIN_FAIL,
  USER_UPDATE_ASADMIN_REQUEST,
  USER_UPDATE_ASADMIN_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants'

// ======================== LOGIN ========================
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        // sends content-type as json so browser knows how to deal with it
        'Content-Type': 'application/json',
      },
    }

    // post to backend with email and password where email will be matched with user from db then
    // password will be decoded and checked
    // when valid server responds with => res.json(<user data>)
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    // after data id fetched, dispatch to Reducer SUCCESS with that data in payload
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    // set userData to LS so that can be initialy loaded in the store
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// ======================== LOGIN ========================
// ======================== LOGOUT ========================

export const logout = () => (dispatch) => {
  // remove from LS
  localStorage.removeItem('userInfo')

  // dispatch action clear states
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: ORDER_MY_LIST_RESET })
  dispatch({ type: USERS_LIST_RESET })
}

// ======================== LOGOUT ========================
// ======================== REGISTER ========================

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    // LOGIN USER JUST AFTER SUCCESFULLY REGISTERED
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    // SET USER IN LS AS IS LOGGED IN
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// ======================== REGISTER ========================
// ========================= GET USER DETAILS =========================

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    // Get userInfo from state
    const {
      userLogin: { userInfo },
    } = getState()

    // prepare headers with user token inside
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // token
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // get data from specific user based on passed id
    const { data } = await axios.get(`/api/users/${id}`, config)

    // pass data to reducer
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// ========================= GET USER DETAILS =========================
// ====================== UPDATE USER PROFILE ======================

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    // Get userInfo from state
    const {
      userLogin: { userInfo },
    } = getState()

    // prepare headers with user token inside
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // token
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// ====================== UPDATE USER PROFILE ======================
// ====================== DELETE USER ============================

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/users/${id}`, config)

    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// ====================== DELETE USER ============================
// ====================== GET ALL USERS LIST ======================

export const listUsers =
  (keyword = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USERS_LIST_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(`/api/users/?keyword=${keyword}`, config)

      dispatch({
        type: USERS_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USERS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

// ====================== GET ALL USERS LIST ======================
// ====================== UPDATE USER AS ADMIN ======================

export const updateUserAsAdmin = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_ASADMIN_REQUEST,
    })

    // get admin token so can perform other user update
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)

    dispatch({ type: USER_UPDATE_ASADMIN_SUCCESS })
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_ASADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// ====================== UPDATE USER AS ADMIN ======================
