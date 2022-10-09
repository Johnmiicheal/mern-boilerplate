import { snakeToCamelCase } from 'json-style-converter/es5';
import { Store as RNC } from 'react-notifications-component';
import { push } from 'redux-first-history';

import { postCreate, getSchool, putSchool } from '_api/school';
import { updateSchool } from '_actions/school';

import { dispatchError } from '_utils/api';

export const attemptCreateSchool = newSchool => dispatch =>
  postCreate(newSchool)
    .then(data => {
      RNC.addNotification({
        title: 'Success!',
        message: data.message,
        type: 'success',
        container: 'top-right',
        animationIn: ['animated', 'fadeInRight'],
        animationOut: ['animated', 'fadeOutRight'],
        dismiss: {
          duration: 5000,
        },
      });

      dispatch(push('/home'));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptGetSchool = () => dispatch =>
  getSchool()
    .then(data => {
      dispatch(updateSchool(snakeToCamelCase(data.school)));
      return data.school;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateSchool = updatedSchool => dispatch =>
  putSchool(updatedSchool)
    .then(data => {
      dispatch(updateSchool(snakeToCamelCase(data.school)));

      RNC.addNotification({
        title: 'Success!',
        message: data.message,
        type: 'success',
        insert: 'bottom',
        container: 'top-right',
        animationIn: ['animated', 'fadeInRight'],
        animationOut: ['animated', 'fadeOutRight'],
        dismiss: {
          duration: 5000,
        },
      });

      return data;
    })
    .catch(dispatchError(dispatch));
