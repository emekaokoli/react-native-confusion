// import { createForms } from 'react-redux-form'
import { createForms } from 'react-redux-form'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { comments } from './Comments'
import { dishes } from './Dishes'
import { favorites } from './favorites'
import { commentsInitial } from './forms'
import { leaders } from './Leaders'
import { promotions } from './Promotions'


export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes,
      comments,
      promotions,
      leaders,
      favorites,
      // form: commentsInitial,
       ...createForms({
         userComment:commentsInitial
          })
    }),
    applyMiddleware(thunk, logger),
  )
  return store
}