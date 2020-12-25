import React, { useCallback, useState } from "react";
import ErrorModal from '../UI/ErrorModal';
import IngredientForm from "./IngredientForm";
import IngredientList from './IngredientList';
import Search from "./Search";

const FIREBASE_REALTIME_DB = 'https://react-ingredients-3feb6-default-rtdb.firebaseio.com/'

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const filterIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients)
  }, [])

  const addIngredientHandler = ingredient => {
    setIsLoading(true)
    fetch(`${FIREBASE_REALTIME_DB}ingredients.json`, {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setIsLoading(false)
        return response.json()
      })
      .then(responseData => {
        setUserIngredients(prevIngredients => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient }
        ])
      })
      .catch(error => {
        setError('Something went wrong!')
        setIsLoading(false)
      })
  }

  const removeIngredientHandler = id => {
    setIsLoading(true)
    fetch(`${FIREBASE_REALTIME_DB}ingredients/${id}.json`, {
      method: 'DELETE'
    })
      .then(response => {
        setIsLoading(false)
        setUserIngredients(prevIngredients => prevIngredients.filter(ig => ig.id !== id))
      })
      .catch(error => {
        setError('Something went wrong!')
        setIsLoading(false)
      })
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filterIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
