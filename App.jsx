import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './navigation';
import { Provider } from"react-redux"
import store from './store';

export default function App() {
  return (
    <>
      <Provider store={store}>
      <StatusBar style="auto" />
      <MainNavigator/>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
