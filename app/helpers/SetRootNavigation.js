import { Navigation } from 'react-native-navigation';


export default (componentName, props) => Navigation.setRoot({
  root: {
    stack: {
      id: 'appStack',
      children: [
        {
          component: {
            name: componentName,
            passProps: { ...props },
          }
        }
      ]
    }
  }
});
