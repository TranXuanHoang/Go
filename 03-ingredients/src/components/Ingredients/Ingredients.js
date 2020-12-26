import React, { useCallback, useMemo, useReducer } from "react";
import ErrorModal from '../UI/ErrorModal';
import IngredientForm from "./IngredientForm";
import IngredientList from './IngredientList';
import Search from "./Search";

const FIREBASE_REALTIME_DB = 'https://react-ingredients-3feb6-default-rtdb.firebaseio.com/'

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id)
    default:
      throw new Error('Should not get there!')
  }
}

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null }
    case 'RESPONSE':
      return { ...curHttpState, loading: false }
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
    case 'CLEAR':
      return { ...curHttpState, error: null }
    default:
      throw new Error('Should not be reached!')
  }
}

const Ingredients = () => {
  // const [userIngredients, setUserIngredients] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState()
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null })

  const filterIngredientsHandler = useCallback(filteredIngredients => {
    // setUserIngredients(filteredIngredients)
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  const addIngredientHandler = useCallback(ingredient => {
    // setIsLoading(true)
    dispatchHttp({ type: 'SEND' })
    fetch(`${FIREBASE_REALTIME_DB}ingredients.jsons`, {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // setIsLoading(false)
        dispatchHttp({ type: 'RESPONSE' })
        return response.json()
      })
      .then(responseData => {
        // setUserIngredients(prevIngredients => [
        //   ...prevIngredients,
        //   { id: responseData.name, ...ingredient }
        // ])
        dispatch({
          type: 'ADD',
          ingredient: { id: responseData.name, ...ingredient }
        })
      })
      .catch(error => {
        // setError('Something went wrong!')
        // setIsLoading(false)
        dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' })
      })
  }, [])

  const removeIngredientHandler = useCallback(id => {
    // setIsLoading(true)
    dispatchHttp({ type: 'SEND' })
    fetch(`${FIREBASE_REALTIME_DB}ingredients/${id}.jsons`, {
      method: 'DELETE'
    })
      .then(response => {
        // setIsLoading(false)
        // setUserIngredients(prevIngredients => prevIngredients.filter(ig => ig.id !== id))
        dispatchHttp({ type: 'RESPONSE' })
        dispatch({ type: 'DELETE', id: id })
      })
      .catch(error => {
        // setError('Something went wrong!')
        // setIsLoading(false)
        dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' })
      })
  }, [])

  const clearError = useCallback(() => {
    // setError(null)
    dispatchHttp({ type: 'CLEAR' })
  }, [])

  // Call useMemo to avoid re-render of IngredientList.
  // 'removeIngredientHandler' is created with useCallback, so it
  // will not change, and therefore 'ingredientList' will only be
  // re-rendered when 'userIngredients' changes.
  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler} />
    )
  }, [userIngredients, removeIngredientHandler])

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />

      <section>
        <Search onLoadIngredients={filterIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
