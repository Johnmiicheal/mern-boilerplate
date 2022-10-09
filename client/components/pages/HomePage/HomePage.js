/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';
import R from 'ramda';
import { Flex } from '@chakra-ui/react';
import Home from '_organisms/Home';

export default function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push('/login'));
    }
  }, [dispatch, user]);

  return (
    <Flex minW="full">
      <Home />
    </Flex>
  );
}
