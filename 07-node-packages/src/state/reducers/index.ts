import { combineReducers } from 'redux'
import repositoriesReducer from './repositoriesReducer'

const reducers = combineReducers({
  repositories: repositoriesReducer
})

export default reducers

// Define type of the whole state object in Redux store
export type RootState = ReturnType<typeof reducers>
