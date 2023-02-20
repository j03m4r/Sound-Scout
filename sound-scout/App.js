import Route from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';

export default function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}
