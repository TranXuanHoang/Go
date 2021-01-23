import faker from 'faker'

// Context/Situation #1
// We are running this file in development in isolation
// We are suing our local index.html file
// Which DEFINITELY has an element with an id of 'dev-cart'
// We want to immediately render our app into that element
const mount = (el) => {
  const cartText = `<div>You have ${faker.random.number()} items in your cart</div>`

  el.innerHTML = cartText
}

if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#dev-cart')

  if (el) {
    mount(el)
  }
}

// Context/Situation #2
// We are running this file in development or production
// through the CONTAINER app
// NO GUARANTEE that an element with an id of 'dev-cart' exists
// WE DO NOT WANT try to immediately render the app
export { mount }
