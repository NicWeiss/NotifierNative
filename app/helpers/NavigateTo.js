import { Navigation } from 'react-native-navigation';


export default (componentName, props) => Navigation.push('appStack', {
  component: {
    name: componentName,
    passProps: { ...props },
  },
});
