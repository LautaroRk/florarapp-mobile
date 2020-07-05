import React, { useState, useEffect, Fragment } from 'react';
import { View } from 'react-native';
import { Text, Image, Button, Icon } from 'react-native-elements';
import { Colors } from '../../config/theme';
import { msToTime, dateToString } from '../../utils/dates';
import { formatNumber } from '../../utils/numbers';
import createStyles from './createStyles';

const SaleCard = props => {

  const { sale } = props;

  const {
    auction_id,
    description,
    quantity,
    date,
    unit_price,
    total,
  } = sale;

  const styles = createStyles();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.quantity}>{`${quantity}`}</Text>
          <Text numberOfLines={1} style={styles.desc}>{description}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.left}>
          <Text>{`Fecha: ${dateToString(new Date(date), true)}`}</Text>
          <Text>{`ID Subasta: ${auction_id * -1}`}</Text>
        </View>
        <View style={styles.right}>
          <Text>{`Precio/u: $${formatNumber(unit_price)}`}</Text>
          <Text style={styles.total}>{`Total: $${formatNumber(total)}`}</Text>
        </View>
      </View>
    </View>
  );
}

export default SaleCard;