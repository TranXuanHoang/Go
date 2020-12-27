import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import useHttp from '../../hooks/http';
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

const Ingredients = () => {
  // const [userIngredients, setUserIngredients] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState()
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])

  // Call custom hook useHttp
  const { isLoading, error, data, sendRequest, reqExtra, reqIdentifier, clear } = useHttp()

  // Handle responses of HTTP requests
  useEffect(() => {
    // Only run the logic when the HTTP request has been reponded successfully
    // which means not in loading status and no error
    if (isLoading || error) {
      return
    }

    switch (reqIdentifier) {
      case 'REMOVE_INGREDIENT':
        dispatch({ type: 'DELETE', id: reqExtra })
        break
      case 'ADD_INGREDIENT':
        dispatch({
          type: 'ADD',
          ingredient: { id: data.name, ...reqExtra }
        })
        break
      default:
        break
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error])

  const filterIngredientsHandler = useCallback(filteredIngredients => {
    // setUserIngredients(filteredIngredients)
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  const addIngredientHandler = useCallback(ingredient => {
    // setIsLoading(true)
    sendRequest(`${FIREBASE_REALTIME_DB}ingredients.json`,
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    )
  }, [sendRequest])

  const removeIngredientHandler = useCallback(id => {
    // setIsLoading(true)
    sendRequest(
      `${FIREBASE_REALTIME_DB}ingredients/${id}.json`,
      'DELETE',
      null,
      id,
      'REMOVE_INGREDIENT'
    )
  }, [sendRequest])

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
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filterIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
