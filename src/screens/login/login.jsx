import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'
import './login.css'

const Login = ({ signin }) => (
  <div className="login">
    <h1 className="login-title">Connexion</h1>
    <button className="btn btn-google" onClick={() => signin('google')}>
      <IconLabel icon="fa fa-google" label="With Google" />
    </button>
    <button className="btn btn-twitter" onClick={() => signin('twitter')}>
      <IconLabel icon="fa fa-twitter" label="With Twitter" />
    </button>
    <button className="btn btn-github" onClick={() => signin('github')}>
      <IconLabel icon="fa fa-github" label="With Github" />
    </button>
    <Link className="login-back" href="/">
      back to home
    </Link>
  </div>
)

Login.propTypes = {
  signin: PropTypes.func.isRequired,
}

export default Login
