import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Route } from 'react-router-dom';
import { App } from './App';

configure({ adapter: new Adapter() })

test('<App /> should contain /checkout and /orders routes when authenticated', () => {
  let wrapper = shallow(
    <App isAuthenticated={true} onTryAutoSignup={() => { }} />
  );

  expect(wrapper.find(Route)).toHaveLength(5)
  expect(wrapper.find({ path: '/checkout' })).toHaveLength(1)
  expect(wrapper.find({ path: '/orders' })).toHaveLength(1)
})
