import { LogBox } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
import { Provider } from 'react-redux';
import configureStore from './src/store';
import App from './app';
import messaging from '@react-native-firebase/messaging';
import { Alert,ToastAndroid } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
const copyToClipboard = (data) => {
  Clipboard.setString(data);
  ToastAndroid.show("Save notify",ToastAndroid.LONG)
};
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  copyToClipboard(JSON.stringify(remoteMessage.notification.body))
});
const store = configureStore();
registerScreens(store, Provider);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.dismissAllModals();

  LogBox.ignoreLogs([
    'Remote debugger',
    'VirtualizedLists should never be nested',
    'Non-serializable values were found in the navigation state',
  ]);

  App(store);
});
