import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../state'

/**
 * A custom hook to avoid having to repeat the type definition of
 * the state parameter passed to useSelector.
 * See https://react-redux.js.org/using-react-redux/static-typing#typing-the-useselector-hook
 */
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
