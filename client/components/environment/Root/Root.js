import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { ChakraProvider } from '@chakra-ui/react';

import Main from '_environment/Main';

export default function Root({ history, store }) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>
    </ChakraProvider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
