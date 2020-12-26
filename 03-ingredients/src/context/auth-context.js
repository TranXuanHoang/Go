import React, { useState } from 'react'

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => { }
})

const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const loginHandler = () => {
    // Here for demonstration purpose, we just set authentication status to true
    setIsAuthenticated(true)
  }

  return (
    <AuthContext.Provider value={{ login: loginHandler, isAuth: isAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
