import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import MainNavigator from './src/navigation/navigation';

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator></MainNavigator>
    </Provider>   
  );
}
