import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import Map from '../components/map';
import Login from '../components/auth/login';
import SignUp from '../components/auth/signup';
import Loading from '../components/auth/loading';

const rootStack = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Map,
  },

  {
    initialRouteName: 'Loading',
  },
);

const App = createAppContainer(rootStack);

export default App;
