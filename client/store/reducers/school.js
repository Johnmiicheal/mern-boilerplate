import update from 'immutability-helper';
import { UPDATE_SCHOOL } from '_actions/school';

export default function school(state = {}, action) {
  switch (action.type) {
    case UPDATE_SCHOOL:
      return update(state, { $merge: action.school });
    default:
      return state;
  }
}
