import * as ActionTypes from './ActionTypes'


export const comment = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      action.payload.id = state.comments.length
      return {
        ...state,
        errMess: null,
        comments: state.comments.concat(action.payload),
      }

    default:
      return state
  }
}
