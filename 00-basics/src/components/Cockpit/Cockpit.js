import React, { useEffect, memo, useRef } from 'react'
import classes from './Cockpit.css'

const cockpit = (props) => {
  const toggleBtnRef = useRef(null)

  useEffect(() => {
    console.log('[Cockpit.js] useEffect')

    toggleBtnRef.current.click()

    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect')
    }
  }, []) // only run when the component is mounted for the first time and when being unmounted

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect')

    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect')
    }
  }) // run every time component is rerendered (every rendering cycle)

  useEffect(() => {
    console.log('[Cockpit.js] 3rd useEffect')

    return () => {
      console.log('[Cockpit.js] cleanup work in 3rd useEffect')
    }
  }, [props.personsLength]) // only run if props.personsLength was changed

  const assignedClasses = []
  let btnClass = ''
  if (props.showPersons) {
    btnClass = classes.Red
  }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red)
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold)
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>Learning React...</p>
      <button ref={toggleBtnRef} className={btnClass}
        onClick={props.clicked}>
        Toggle Persons
      </button>
    </div>
  )
}

export default memo(cockpit)
