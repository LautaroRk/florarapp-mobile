import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Overlay } from 'react-native-elements';
import { Text, Button, Icon } from 'react-native-elements';
import { View } from 'react-native';
import { Colors } from '../../../config/theme';
import createStyles from './createStyles';
import LoadingModal from '../../modals/LoadingModal';
import TextModal from '../../modals/TextModal';
import { formatNumber } from '../../../utils/numbers';

import { addSale, getAuctions } from '../../../redux/auctions/auctionsActions';
import { getHistory } from '../../../redux/auth/authActions';

import socket from '../../../apis/socket';

/**
 * Modal de confirmacion de compra donde se elige la cantidad
 * 
 * @param {Object} auction REQUIRED
 * @param {Boolean} isVisible REQUIRED
 * @param {Function} hideModal REQUIRED
 * @param {Number} price REQUIRED
 * @param {String} title REQUIRED
 */
const ConfirmationModal = props => {
  
  const {
    auction = {},
    isVisible = false,
    hideModal = () => console.warn("ConfirmationModal requires a hideModal function prop"),
    price,
    title,
    stock_left,
  } = props;

  const {
    _id,
    min_quantity,
    auction_id,
  } = auction;

  const [quantity, setQuantity] = useState(min_quantity);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    if (stock_left < min_quantity) {
      setQuantity(stock_left);
    } else {
      setQuantity(min_quantity);
    }
  }, [stock_left]);

  const handleConfirm = async () => {
    try {
      setLoading(true);

      let action = addSale(_id, props.user._id, props.token, price, quantity);
      action.payload = await action.payload;
      await getAuctionList();
      setLoading(false);

      // Si hay error mostramos el mensaje en el modal
      if (action.payload.hasOwnProperty('error')) {
        setModalTitle('Algo salió mal ☹');
        setModalText(action.payload.error.message);
        setModalVisible(true);

      // Si no, mostramos mensaje de compra exitosa
      } else {
        socket.emit("stock update", {_id, quantity, user: props.user.username});
        props.dispatch(action);
        
        setModalTitle("¡Albricias!");
        setModalText(`Reservaste ${quantity} paquetes de ${title} por $${formatNumber(price * quantity)}`);
        setModalVisible(true);
        
        await getUserHistory();
      }

    } catch (error) {
      console.error(error);
    }
  }

  const getAuctionList = async () => {
    try {
      let action = getAuctions();
      action.payload = await action.payload;

      if (action.payload.hasOwnProperty('error')) {
        setModalText(action.payload.error.message);
        setModalVisible(true);
      } else {
        props.dispatch(action);
      }

    } catch (error) {
      console.error(error);
    }
  }

  const getUserHistory = async () => {
    try {
      let action = getHistory(props.user._id, props.token);
      action.payload = await action.payload;
      
      if (action.payload.hasOwnProperty('error')) {
        setModalText(action.payload.error.message);
        setModalVisible(true);
      } else {
        props.dispatch(action);
      }

    } catch (error) {
      console.error(error);
    }
  }

  const styles = createStyles({ title });

  // Muestra los detalles del producto
  const renderInfo = () => (
    <View style={styles.info}>
      {/* TAGS */}
      <View style={styles.tags}>
        <Text style={styles.tag}>ID Subasta</Text>
        <Text style={styles.tag}>Stock disponible</Text>
        <Text style={styles.tag}>Compra mínima</Text>
        <Text style={styles.tag}>Precio por unidad</Text>
      </View>
      {/* VALUES */}
      <View style={styles.values}>
        <Text style={styles.value}>{ auction_id * -1 }</Text>
        <Text style={styles.value}>{ stock_left }</Text>
        <Text style={styles.value}>{ min_quantity } unidades</Text>
        <Text style={styles.value}>${ formatNumber(price) }</Text>
      </View>
    </View>
  );

  // Renderiza el contador de cantidad
  const renderCounter = () => (
    <Fragment>
      <Text style={styles.counterTitle}>CANTIDAD</Text>
      <View style={styles.counterContainer}>
        <Button 
          title="-10"
          containerStyle={styles.counterButton}
          disabled={quantity < (min_quantity + 10)}
          onPress={() => setQuantity(quantity - 10)}
        />
        <Button 
          icon={<Icon name='remove' type='material' color={Colors.white} />}
          containerStyle={styles.counterButton}
          disabled={quantity <= min_quantity}
          onPress={() => setQuantity(quantity - 1)}
        />
        <Text h3 style={styles.counter}>{quantity}</Text>
        <Button 
          icon={<Icon name='add' type='material' color={Colors.white} />}
          containerStyle={styles.counterButton}
          disabled={quantity >= stock_left}
          onPress={() => setQuantity(quantity + 1)}
        />
        <Button 
          title="+10"
          containerStyle={styles.counterButton}
          disabled={quantity > (stock_left - 10)}
          onPress={() => setQuantity(quantity + 10)}
        />
      </View>
    </Fragment>
  );

  return (
    <Overlay overlayStyle={styles.container} isVisible={isVisible}>
      <Fragment>
        <Text style={styles.title}>{ title }</Text>

        {/* INFO */}
        { renderInfo() }

        {/* COUNTER */}
        { renderCounter() }

        {/* TOTAL PRICE */}
        <Text style={styles.totalPrice}>Total: ${formatNumber(price * quantity)}</Text>

        {/* BOTONES */}
        <View style={styles.buttonsContainer}>
          <Button 
            title="Cancelar" 
            containerStyle={styles.button} 
            buttonStyle={{backgroundColor: Colors.grey}}
            onPress={() => {
              setQuantity(stock_left >= min_quantity ? min_quantity : stock_left);
              hideModal();
            }}
          />
          <Button 
            title="Confirmar" 
            containerStyle={styles.button}
            disabled={stock_left < quantity}
            onPress={async () => await handleConfirm()} 
          />
        </View>
        <Text style={styles.legalText}>* Cada reserva es un compromiso de compra</Text>
        
        {/* MODAL LOADING */}
        <LoadingModal isVisible={loading} />

        {/* MODAL DE TEXTO */}
        <TextModal 
          title={modalTitle}
          text={modalText}
          isVisible={modalVisible}
          hideModal={() => {
            //setQuantity(stock_left >= min_quantity ? min_quantity : stock_left);
            setModalVisible(false);
            hideModal();
          }}
        />
      </Fragment>
    </Overlay>
  );
}

/**
 * Obtenemos la data del store
 * @param { Object } state
 */
const mapStateToProps = ( state ) =>{
  return {
    user: state.authReducer.user,
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(ConfirmationModal);