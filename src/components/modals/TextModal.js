import React, { Fragment } from 'react';
import { Overlay } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';

/**
 * Modal para mostrar texto y un titulo opcional
 * 
 * @param {Boolean} isVisible REQUIRED
 * @param {String} title
 * @param {String} text REQUIRED
 * @param {Function} hideModal REQUIRED
 */
const TextModal = props => (
  <Overlay overlayStyle={styles.container} isVisible={props.isVisible} animationType='fade'>
    <Fragment>
      { props.title && 
        <Text h4>{props.title}</Text>
      }
      <Text style={styles.text}>{props.text}</Text>
      <Button title="Aceptar" onPress={props.hideModal} />
    </Fragment>
  </Overlay>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    marginTop: 5,
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default TextModal;