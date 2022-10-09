export const UPDATE_SCHOOL = 'UPDATE_SCHOOL';

export function updateSchool(school) {
  return {
    type: UPDATE_SCHOOL,
    school,
  };
}
