import Toast from 'react-native-simple-toast';


export default (msg, isLong = false) => {
  Toast.showWithGravity(msg, isLong ? Toast.LONG : Toast.SHORT, Toast.BOTTOM);
};
