import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent'
import Main from './components/MainComponent'
import { ConfigureStore } from './redux/configureStore'

const { persistor, store } = ConfigureStore()
export default class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    )
  }
}
