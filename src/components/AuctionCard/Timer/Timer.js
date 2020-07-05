import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { getHours, getMinutes, getSeconds } from '../../../utils/dates';
import createStyles from './createStyles';

const Timer = props => {

  const {
    ends,
    endAuction,
    updatePrice,
    auction_id, // For debug only @TODO: remove (from parent also)
  } = props;

  let [timeLeft, setTimeLeft] = useState(0);
  let [timerId, setTimerId] = useState(null);
  const timerRef = useRef(null);
  timerRef.current = { timeLeft, setTimeLeft };

  useEffect(() => {
    clearInterval(timerId);
    let _ = setInterval(() => {
      timerRef.current.setTimeLeft(ends - new Date().valueOf());
      // Si ya termino
      if (timerRef.current.timeLeft <= 0) {
        clearInterval(timerId);
        endAuction();
      // Si sigue activa
      } else {
        //console.log("PRICE UPDATED: ", auction_id);
        updatePrice(timerRef.current.timeLeft);
      }
    }, 1000);
    setTimerId(_);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const styles = createStyles();

  return (
    <View style={styles.timerContainer}>
      <Text h3>{getHours(timeLeft)}</Text>
      <Text h3>{getMinutes(timeLeft)}</Text>
      <Text h3>{getSeconds(timeLeft)}</Text>
    </View>
  );
}

export default Timer;