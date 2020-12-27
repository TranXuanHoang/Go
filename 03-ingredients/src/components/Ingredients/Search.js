import React, { useEffect, useRef, useState } from "react";
import useHttp from '../../hooks/http';
import Card from "../UI/Card";
import ErrorModal from '../UI/ErrorModal';
import "./Search.css";

const FIREBASE_REALTIME_DB = 'https://react-ingredients-3feb6-default-rtdb.firebaseio.com/'

const Search = React.memo(props => {
  const { onLoadIngredients } = props
  const [enteredFilter, setEnteredFilter] = useState('')
  const inputRef = useRef()

  const { isLoading, error, data, sendRequest, clear } = useHttp()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        // In order to filter by title, we need to setup the rules of indexing
        // the 'ingredients' collection of our Firebase Realtime database.
        // For example, below is that setup
        // {
        //   "rules": {
        //     ...
        //     "ingredients": {
        //       ".indexOn": ["title"]
        //     }
        //   }
        // }
        const query = enteredFilter.length === 0
          ? ''
          : `?orderBy="title"&equalTo="${enteredFilter}"`

        sendRequest(
          `${FIREBASE_REALTIME_DB}ingredients.json${query}`,
          'GET'
        )
      }
    }, 500) // setTimeout for 500ms to avoid sending requests to the backend server for every keystroke user entered

    // Return a clean-up function to delete unnecessary timers.
    // The clean-up function will run before the next time the 'useEffect' function runs
    return () => {
      clearTimeout(timer)
    }
  }, [enteredFilter, inputRef, sendRequest]) // Only rerun useEffect if any elements in the array were changed

  // Handle responses of HTTP requests
  useEffect(() => {
    // Only run the logic when the HTTP request has been reponded successfully
    // which means not in loading status and no error
    if (isLoading || error || !data) {
      return
    }

    console.log(data)
    const loadedIngredients = []
    for (let key in data) {
      loadedIngredients.push({
        id: key,
        ...data[key]
      })
    }
    console.log(loadedIngredients)
    onLoadIngredients(loadedIngredients)
  }, [data, isLoading, error, onLoadIngredients])

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input type="text"
            ref={inputRef}
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
