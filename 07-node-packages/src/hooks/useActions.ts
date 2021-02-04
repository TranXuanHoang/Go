import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state'

/** A custom hook to avoid having to write
 *
 *   ```
 *   const dispatch = useDispatch()
 *   const eventHandlerFn = (params) => dispatch(actions.actionCreatorFn(params))
 *   ```
 */
export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(actionCreators, dispatch)
}
