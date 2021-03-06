import { StatusBar } from 'expo-status-bar';
import MainNavigator from './navigation';
import { Provider } from"react-redux"
import store from './store';
import MyCocktailsContextProvider from './context/MyCocktailsContext'
// db
import { init } from './db';

init()
.then(() => console.log("Database initialized."))
.catch( err => {
  console.log("Database fail connection: " + err.message);
})

export default function App() {
  return (
    <Provider store={store}>
      <MyCocktailsContextProvider>
        <StatusBar style="auto" />
        <MainNavigator />
      </MyCocktailsContextProvider>
    </Provider>
  );
}
