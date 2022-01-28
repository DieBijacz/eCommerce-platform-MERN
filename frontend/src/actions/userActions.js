import axios from 'axios'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants'

// ====== LOGIN ======
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

    // when data id fetch, dispatch SUCCESS with that data in payload
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

// ====== LOGOUT ======
export const logout = () => (dispatch) => {
  // remove from LS
  localStorage.removeItem('userInfo')

  // dispatch action to change state
  dispatch({ type: USER_LOGOUT })
}

// ====== REGISTER ======
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
