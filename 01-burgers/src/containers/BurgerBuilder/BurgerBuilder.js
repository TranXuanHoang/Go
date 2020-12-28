import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../axios-orders'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

// Use the 'export' keyword here to export this BurgerBuilder component for unit testing
export const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false)

  // [REDUX] Method 2: Use React Redux 'useSelector' and 'useDispatch' hooks
  const { ings, price, error, isAuthenticated } = useSelector(state => {
    return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      error: state.burgerBuilder.error,
      isAuthenticated: state.auth.token !== null
    }
  })

  const dispatch = useDispatch()
  const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName))
  const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName))
  const onInitIngredients = useCallback( // Call useCallback to avoid re-render of onInitIngredients
    () => dispatch(actions.initIngredients()),
    [dispatch]
  )
  const onInitPurchase = () => dispatch(actions.purchaseInit())
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path))

  useEffect(() => {
    onInitIngredients()
  }, [onInitIngredients])

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0)
    return sum > 0;
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true)
    } else {
      onSetAuthRedirectPath('/checkout')
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    onInitPurchase()
    props.history.push('/checkout')
  }

  const disabledInfo = {
    ...ings
  }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  let orderSummary = null
  let burger = error ?
    <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p>
    : <Spinner />
  if (ings) {
    burger = (
      <Fragment>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
          price={price} />
      </Fragment>
    )

    orderSummary = <OrderSummary ingredients={ings}
      price={price}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler} />
  }

  return (
    <Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Fragment>
  )
}

// [REDUX] Method 1: Use React Redux 'connect' function
// const mapStateToProps = state => {
//   return {
//     ings: state.burgerBuilder.ingredients,
//     price: state.burgerBuilder.totalPrice,
//     error: state.burgerBuilder.error,
//     isAuthenticated: state.auth.token !== null
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//     onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//     onInitIngredients: () => dispatch(actions.initIngredients()),
//     onInitPurchase: () => dispatch(actions.purchaseInit()),
//     onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withErrorHandler(BurgerBuilder, axios))

// [REDUX] Method 2: Use React Redux 'useSelector' and 'useDispatch' hooks
export default withErrorHandler(BurgerBuilder, axios)
