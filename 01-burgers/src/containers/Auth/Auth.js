import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'
import { checkValidity } from '../../shared/utility'
import * as actions from '../../store/actions/index'
import classes from './Auth.module.css'

const Auth = props => {

  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  })
  const [formIsValid, setFormIsValid] = useState(false)
  const [isSignup, setIsSignup] = useState(true)

  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props
  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath()
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...authForm,
      [controlName]: {
        ...authForm[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, authForm[controlName].validation),
        touched: true
      }
    }

    let formIsValid = true
    for (let controlName in updatedControls) {
      formIsValid = formIsValid && updatedControls[controlName].valid
    }

    setAuthForm(updatedControls)
    setFormIsValid(formIsValid)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    props.onAuth(
      authForm.email.value,
      authForm.password.value,
      isSignup
    )
  }

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup)
  }

  /** Convert 'UNDERSCORED_MESSAGE' to 'Underscore Message' */
  const humanize = (errorCode) => {
    return errorCode
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/(?: |\b)(\w)/g, (key, p1) => {
        return key.toUpperCase();
      })
  }

  const formElementsArray = []
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key]
    })
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)} />
  ))

  if (props.loading) {
    form = <Spinner />
  }

  let errorMessage = null
  if (props.error) {
    errorMessage = (
      <p>{humanize(props.error.message)}</p>
    )
  }

  let authRedirect = null
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      <h3>{isSignup ? 'REGISTER' : 'LOGIN'}</h3>
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success" disabled={!formIsValid}>SUBMIT</Button>
      </form>
      <Button btnType="Danger"
        clicked={switchAuthModeHandler}>
        SWITCH TO {isSignup ? 'LOGIN' : 'SIGNUP'}
      </Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
