// import { createForms } from 'react-redux-form'
import { createForms } from 'react-redux-form'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import { persistCombineReducers, persistStore } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import thunk from 'redux-thunk'
import { comments } from './Comments'
import { dishes } from './Dishes'
import { favorites } from './favorites'
import { commentsInitial } from './forms'
import { leaders } from './Leaders'
import { promotions } from './Promotions'

const config = {
  key: 'root',
  storage,
  debug: true,
}

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      dishes,
      comments,
      promotions,
      leaders,
      favorites,
      // form: commentsInitial,
      ...createForms({
        userComment: commentsInitial,
      }),
    }),
    applyMiddleware(thunk, logger),
  )
   const persistor = persistStore(store)

   return { persistor, store }
}