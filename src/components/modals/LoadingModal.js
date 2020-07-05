import React from 'react';
import { Overlay } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { Colors } from '../../config/theme';

const LoadingModal = props => (
  <Overlay isVisible={props.isVisible} animationType='fade'>
    <ActivityIndicator size={ Platform.OS === 'ios' ? 1 : 80 } color={ Colors.primary } />
  </Overlay>
);

export default LoadingModal;