import React, { useState, useEffect, useRef, Fragment } from 'react';
import { View, Animated } from 'react-native';
import { Text, Image, Button, Icon } from 'react-native-elements';
import { Colors } from '../../config/theme';
import { msToTime, dateToString } from '../../utils/dates';
import { formatNumber } from '../../utils/numbers';
import createStyles from './createStyles';
import ConfirmationModal from './ConfirmationModal/ConfirmationModal';
import Timer from './Timer/Timer';

//import socket from '../../apis/socket';

const AuctionCard = props => {

  const { auction = {}, fetchFreq } = props;

  const {
    article_id,
    description,
    description0C,
    variety,
    image_url = "https://www.freeiconspng.com/uploads/no-image-icon-11.PNG",
    stems,
    color,
    source,
    stem_length,
    quality,
    stock_left,
    start_date,
    end_date,
    duration,
    initial_price,
    min_price,
    discount_freq,
    price_stages,
    auction_id,
  } = auction;

  const [price, setPrice] = useState(initial_price);
  const [hasEnded, setHasEnded] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  let [isActive, setIsActive] = useState(false);
  const isActiveRef = useRef(null);
  isActiveRef.current = {isActive, setIsActive};
  const [lastHookedAt, setLastHookedAt] = useState(null);

  useEffect(() => {
    // @TODO: Separar hook de timeout?
    // SE ESTA CORRIENDO TRES VECES POR FETCH, 
    // SIN ARRAY DE DEPENDENCIAS PARECE QUE FUNCIONA PERO SE QUEJA
    const now = new Date().valueOf();
    // CHEQUEAR: prevenimos que se ejecute el hook repetidas veces
    if (!lastHookedAt || now - lastHookedAt >= 3000) {
      //console.log('EFFECT RUN: ', auction_id, isActive ? 'ACTIVE' : '');
      setLastHookedAt(now);
      const starts = new Date(start_date).valueOf();
      const ends = new Date(end_date).valueOf();
  
  
      if (now >= starts && ends > now) {
        isActiveRef.current.setIsActive(true);
      } else if (ends <= now) {
        setHasEnded(true);
      } else {
        // Si todavia no empezo
        let timeout = starts - now;
        if (timeout <= fetchFreq && !timeoutId) {
          let _ = setTimeout(() => {
            startAuction();
          }, timeout);
          setTimeoutId(_);
          //console.log("TIMEOUT SET: ", auction_id, timeout, timeoutId);
        }
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
        setLastHookedAt(null);
        //console.log("TIMEOUT CLEARED: ", auction_id, timeoutId);
      }
    }
  }); //, [isActiveRef.current.isActive]

  const endAuction = () => {
    isActiveRef.current.setIsActive(false);
    setHasEnded(true);
  };

  const startAuction = () => {
    isActiveRef.current.setIsActive(true);
    //console.log("ACTIVATE", auction_id, isActive);
  };

  const getPrice = (timeLeft) => {
    const _times = (duration - timeLeft) / discount_freq;
    const times = parseInt(_times);
    //console.log(times);
    if (times < 0) return initial_price;
    if (times >= price_stages.length) return min_price;
    return price_stages[times];
  };

  const updatePrice = (timeLeft) => {
    const newPrice = getPrice(timeLeft);
    if (newPrice !== price) setPrice(newPrice);
  };

  // Muestra los detalles del producto
  const renderDetails = () => (
    <View style={styles.info}>
      {/* TAGS */}
      <View style={styles.tags}>
        <Text style={styles.tag}>Color</Text>
        <Text style={styles.tag}>Origen</Text>
        <Text style={styles.tag}>Varas</Text>
        <Text style={styles.tag}>Largo</Text>
        <Text style={styles.tag}>Calidad</Text>
      </View>
      {/* VALUES */}
      <View style={styles.values}>
        <Text numberOfLines={1} style={styles.value}>{ color || "-" }</Text>
        <Text numberOfLines={1} style={styles.value}>{ source || "-" }</Text>
        <Text numberOfLines={1} style={styles.value}>{ stems || "-" }</Text>
        <Text numberOfLines={1} style={styles.value}>{ stem_length || "-" }</Text>
        <Text numberOfLines={1} style={styles.value}>{ quality || "-" }</Text>
      </View>
    </View>
  );

  const renderTimer = () => {
    const starts = new Date(start_date);
    const ends = new Date(end_date);

    if (!isActive) {
      if (hasEnded) {
        return (
          <View style={styles.auctionDateContainer}>
            <Text>Subasta terminada</Text>
            <Text>{ dateToString(ends) }</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.auctionDateContainer}>
            <Text>Inicio:</Text>
            <Text>{ dateToString(starts) }</Text>
          </View>
        );
      }
    } else {
      return (
        <Fragment>
          <Icon name="timer" type="material" color={Colors.dark} size={29} style={styles.timerIcon}/>
          <Timer
            ends={new Date(end_date).valueOf()}
            endAuction={() => endAuction()}
            updatePrice={(timeLeft) => updatePrice(timeLeft)}
            auction_id={auction_id}
          />
        </Fragment>
      );
    }
  }

  let title = '';
  if (article_id === '0C') {
    title = description0C;
  } else {
    title += description;
    if (variety) title += ` ${variety}`;
  }

  const styles = createStyles({ title, stock_left });

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        {/* TITLE */}
        <View style={styles.headerLeft}>
          <Text style={styles.stock}>{ stock_left }</Text>
          <Text style={styles.title}>{ title }</Text>
        </View>
        {/* PRICE */}
        <Text h3>{ '$' + price }</Text>
      </View>
      {/* BODY */}
      <View style={styles.body}>
        {/* IMAGE */}
        <Image style={styles.image} containerStyle={styles.imageContainer} source={{uri: image_url}} />
        {/* DETAILS */}
        { renderDetails() }
      </View>
      {/* FOOTER */}
      <View style={styles.footer}>
        {/* TIMER */}
        <View style={styles.timerContainer}>
        { renderTimer() }
        </View>
        <Button
          iconRight={true}
          icon={<Icon name='add-circle' type='material' color={Colors.white} size={15} marginLeft={10}/>}
          title="Comprar"
          containerStyle={styles.buttonContainer}
          disabled={new Date(start_date) > new Date() || new Date(end_date) <= new Date() || stock_left <= 0}
          onPress={() => setModalVisible(true)}
        />
      </View>

      {/* Confirmation Modal */}
      <ConfirmationModal 
        isVisible={modalVisible}
        hideModal={() => setModalVisible(false)}
        auction={auction}
        stock_left={stock_left}
        price={formatNumber(price)}
        title={title}
      />
    </View>
  );
}

export default AuctionCard;