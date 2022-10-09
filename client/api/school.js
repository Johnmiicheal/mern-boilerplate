import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';

export const getSchool = () =>
  request.get('/api/school')
    .then(handleSuccess)
    .catch(handleError);

export const putSchool = info =>
  request.put('/api/school')
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const postCreate = school =>
  request.post('/api/school/create')
    .send(school)
    .then(handleSuccess)
    .catch(handleError);
