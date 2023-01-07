import { Alert } from "react-native";
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import { Api } from 'app/helpers';


const showMessage = (remoteMessage) => {
  Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body, [
    {
      text: "Ok",
      onPress: () => null,
    }
  ]);
}

const getToken = async () => {
  const fcm_token = await messaging().getToken();

  if (fcm_token) {
    console.log('Current token is', fcm_token);
    try {
      response = await Api.doRequest('POST', 'acceptors/update_push_tokens', { data: { fcm_token } });
    } catch (error) {
      console.log('Can\'t send fcm to server', error);
      return;
    }
  }
}

async function storeMessage(remoteMessage) {
  const storedMessages = await AsyncStorage.getItem('messages');
  const messages = storedMessages ? JSON.parse(storedMessages) : { items: [] };
  messages.items.push(remoteMessage);
  const jsonedMessages = JSON.stringify(messages);
  await AsyncStorage.setItem('messages', jsonedMessages);
}

async function showStoredMessages() {
  console.log('Time to show!');

  const storedMessages = await AsyncStorage.getItem('messages');
  const messages = storedMessages ? JSON.parse(storedMessages) : { items: [] };
  let body = '';

  if (messages.items.length > 0) {
    messages.items.reverse().forEach(remoteMessage => {
      const currentDate = new Date();
      const gmt = (currentDate.getTimezoneOffset() * 60 * 1000);
      let dateString = new Date(remoteMessage.sentTime - gmt).toISOString()
        .replace(/-/g, '.')
        .replace('T', ' ')
        .replace('Z', ' ')
        .substring(0, 16)
      let title = remoteMessage.notification.title;
      let message = remoteMessage.notification.body;

      body += `${dateString}\n`;
      body += `-----------------------------\n\n`;
      body += `  ${title}\n\n`;
      body += `${message}\n\n\n`;

      console.log(remoteMessage);
    });

    Alert.alert('Notifies', body, [
      {
        text: "Ok",
        onPress: () => null,
      }
    ]);

    await AsyncStorage.setItem('messages', '');
  }
}

function pushControllerInit() {
  // while app is opened
  messaging().onMessage(showMessage)
  // open from tray when app is not closed
  messaging().onNotificationOpenedApp(showMessage)
  // open from tray when app is closed
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Push in headless');
    storeMessage(remoteMessage);
  });

  getToken();
}

export { pushControllerInit, showStoredMessages }
