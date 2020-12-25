import React, { useEffect, useRef, useState } from "react";
import Card from "../UI/Card";
import "./Search.css";

const FIREBASE_REALTIME_DB = 'https://react-ingredients-3feb6-default-rtdb.firebaseio.com/'

const Search = React.memo(props => {
  const { onLoadIngredients } = props
  const [enteredFilter, setEnteredFilter] = useState('')
  const inputRef = useRef()

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

        fetch(`${FIREBASE_REALTIME_DB}ingredients.json${query}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(responseData => {
            console.log(responseData)
            const loadedIngredients = []
            for (let key in responseData) {
              loadedIngredients.push({
                id: key,
                ...responseData[key]
              })
            }
            console.log(loadedIngredients)
            onLoadIngredients(loadedIngredients)
          })
      }
    }, 500) // setTimeout for 500ms to avoid sending requests to the backend server for every keystroke user entered

    // Return a clean-up function to delete unnecessary timers.
    // The clean-up function will run before the next time the 'useEffect' function runs
    return () => {
      clearTimeout(timer)
    }
  }, [enteredFilter, onLoadIngredients, inputRef]) // Only rerun useEffect if any elements in the array were changed

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
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
