
import { Provider } from 'react-redux'
import './App.css'
import AppRouter from './router/AppRouter'
import store from './store/store'
import Header from './components/ui/Header/Header'

function App() {

  return (
    <>
       <Provider store={store}>
        <Header/>
        <AppRouter/>
      </Provider>
    </>
  )
}

export default App
