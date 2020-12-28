import React, { Fragment } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.module.css'

const Modal = props => {
  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}>
        {props.children}
      </div>
    </Fragment>
  )
}

// The second argument is a custom comparison function determining when
// React.memo() should not re-render the Modal component.
// https://reactjs.org/docs/react-api.html#reactmemo
export default React.memo(
  Modal,
  (prevProps, nextProps) => {
    return nextProps.show === prevProps.show && nextProps.children === prevProps.children
  }
)
