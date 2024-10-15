import AppNavigator from "./src/navigator/AppNavigator";
import store from "./src/redux/Store";
import { Provider } from "react-redux";

export default function App() {

  return (
    
    <Provider store={store}>
    <AppNavigator />
      </Provider>
    
  

  )

  
}
