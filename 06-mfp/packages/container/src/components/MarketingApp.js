import { mount } from 'marketing/MarketingApp'
import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

export default () => {
  const ref = useRef(null)

  // Get currently being used route history object
  // that is the browser route history
  const history = useHistory()

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location

        if (pathname !== nextPathname) {
          history.push(nextPathname)
        }
      }
    })

    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
}
