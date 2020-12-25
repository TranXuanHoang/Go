import React, { useCallback, useState } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from './IngredientList';
import Search from "./Search";

const FIREBASE_REALTIME_DB = 'https://react-ingredients-3feb6-default-rtdb.firebaseio.com/'

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filterIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
