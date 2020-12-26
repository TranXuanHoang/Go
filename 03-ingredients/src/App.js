import React, { useContext } from "react";
import './App.css';
import Auth from './components/Auth';
import Ingredients from "./components/Ingredients/Ingredients";
import { AuthContext } from './context/auth-context';

function App() {
  const authContext = useContext(AuthContext);

  let content = <Auth />;
  if (authContext.isAuth) {
    content = <Ingredients />;
  }

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
