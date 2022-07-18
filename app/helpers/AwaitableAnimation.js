import { Animated } from 'react-native';


export default async (animation, toValue, duration) => {
  await new Promise(resolve => {
    setTimeout(() => {
      Animated.timing(animation, {
        toValue: toValue,
        duration: duration,
        useNativeDriver: false
      }).start();
    }, 0);

    setTimeout(() => { resolve() }, duration);
  });
};
