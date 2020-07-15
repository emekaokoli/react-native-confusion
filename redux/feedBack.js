import * as ActionTypes from './ActionTypes'

export const feedBack = (state = { errMess: null, feedback: [] }, action) => {
         switch (action.type) {
          //  case ActionTypes.ADD_FEEDBACK:
          //    return { ...state, errMess: null, feedback: action.payload }

           case ActionTypes.FEEDBACK_FAILED:
             return { ...state, errMess: action.payload }

           case ActionTypes.ADD_FEEDBACK:
             var fdBack = action.payload
             return { ...state, feedback: state.feedback.concat(fdBack) }

           default:
             return state
         }
       }
