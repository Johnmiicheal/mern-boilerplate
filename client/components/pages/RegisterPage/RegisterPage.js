import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';
import R from 'ramda';

import BodyLayout from '_organisms/BodyLayout';

import Register from '_organisms/Register';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  useEffect(() => {
    if (!R.isEmpty(user)) {
      dispatch(push('/home'));
    }
  }, [dispatch, user]);

  return (
    <BodyLayout>
      <Register />
    </BodyLayout>
  );
}
