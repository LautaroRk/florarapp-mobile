import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/auth/authActions';

import LoadingModal from '../../components/modals/LoadingModal';
import TextModal from '../../components/modals/TextModal';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import { 
  Button,
  Input,
} from 'react-native-elements';

const Login = props => {

  // @TODO: save and validate token

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('asd123');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [inputsMissing, setInputsMissing] = useState(false);

  const clearForm = () => {
    setUsername('admin');
    setPassword('asd123');
    setInputsMissing(false);
  }

  const onLogin = async () => {
    try {
      if (username === '' || password === '') {
        setInputsMissing(true);
        return false;
      }

      setLoading(true);

      let action = login(username, password);
      action.payload = await action.payload;

      setLoading(false);
      
      if (action.payload.hasOwnProperty('error')) {
        // @TODO: modificar los errores en el back para que todos incluyan un error.message
        console.log(action.payload.error);
        if (action.payload.error.hasOwnProperty('message')) {
          setModalText(action.payload.error.message);
          setModalVisible(true);
        } 
      } 
      else {
        props.dispatch(action);
      }

      clearForm();

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Input
        value={username}
        onChangeText={newValue => setUsername(newValue)}
        label="Nombre de usuario"
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        maxLength={20}
        autoCorrect={false}
        autoCapitalize='none'
        errorMessage={(inputsMissing && !username) ? "Campo requerido" : ''}
      />
      <Input
        value={password}
        onChangeText={newValue => setPassword(newValue)}
        label="Contraseña"
        secureTextEntry
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        autoCorrect={false}
        maxLength={20}
        errorMessage={(inputsMissing && !password) ? "Campo requerido" : ''}
      />
      <Button 
        title="Iniciar sesión" 
        onPress={onLogin}
        containerStyle={styles.loginButton}
      />

      {/* Loading modal */}
      <LoadingModal isVisible={loading} />
      {/* Text modal */}
      <TextModal 
        isVisible={modalVisible}
        text={modalText} 
        hideModal={() => setModalVisible(false)}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  loginButton: {
    marginTop: 5,
  },
});

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

//Conectando con redux
export default connect(mapStateToProps)(Login);
