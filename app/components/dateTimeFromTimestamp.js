import React from 'react';
import { Text } from 'react-native';


const DateTimeFromTimestamp = ({ timestamp, type }) => {

  let date = new Date();
  let output = '';
  date.setTime(timestamp);


  if (!timestamp) {
    return(<Text></Text>);
  }

  if (type === 'date') {
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let month = (date.getMonth()+1) < 10 ? `0${date.getMonth()+1}` : (date.getMonth()+1);
    output = `${day}.${month}.${date.getFullYear()}`;
  }

  if (type === 'time') {
    let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    output = `${hours}:${minutes}`;
  }

  return (
    <Text> {output} </Text>
  );
};

export default DateTimeFromTimestamp;
