// import { createForms } from 'react-redux-form'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { comments } from './Comments'
import { dishes } from './Dishes'
import { favorites } from './favorites'
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
    }),
    applyMiddleware(thunk, logger),
  )
  return store
}