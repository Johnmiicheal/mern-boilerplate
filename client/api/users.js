import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';

export const postCheckUser = adminName =>
  request.post('/api/users/checkuser')
    .send({ adminName })
    .then(handleSuccess)
    .catch(handleError);

export const postCheckPhoneNumber = phoneNumber =>
  request.post('/api/users/checknumber')
    .send({ phoneNumber })
    .then(handleSuccess)
    .catch(handleError);
