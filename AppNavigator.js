import React from 'react';
import { connect } from 'react-redux';
import { Colors } from './src/config/theme';

import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem, DrawerItemList } from '@react-navigation/drawer'; 

import { Icon } from 'react-native-elements';

import LoginScreen from './src/containers/Login/Login';
import HomeScreen from './src/containers/Home/Home';
import UserHistory from './src/containers/UserHistory/UserHistory';

import { logout } from './src/redux/auth/authActions';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// @TODO: agregar pantalla de admin para cambiar el estado de entrega y pago de las ventas

const HomeDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Subastas" component={HomeScreen} />
      <Drawer.Screen name="Historial de compras" component={UserHistory} />
    </Drawer.Navigator>
  );
};

const AppNavigator = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!props.token ? (
          <Stack.Screen 
            name="Login"
            component={LoginScreen}
            options={{
              title: "Florar",
              animationTypeForReplace: props.isLogout ? 'pop' : 'push',
            }}
          />
        ) : (
          <Stack.Screen 
            name="Inicio"
            component={HomeDrawer}
            options={({ navigation }) => ({
              title: "FLORAR",
              headerTitleAlign: 'center',
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerLeft: () => (
                <Icon name="bars" type="font-awesome" color={Colors.white} size={29} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
              ),
              headerLeftContainerStyle: {
                marginLeft: 15,
              },
              headerRight: () => (
                <Icon name="sign-out" type="font-awesome" color={Colors.white} size={29} onPress={() => props.dispatch(logout())} />
              ),
              headerRightContainerStyle: {
                marginRight: 15,
              },
            })}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/**
 * Obtenemos la data del store
 * @param { Object } state
 */
const mapStateToProps = ( state ) => {
  return {
    user: state.authReducer.user,
    token: state.authReducer.token,
    isLogout: state.authReducer.isLogout,
  }
}

//Conectando con redux
export default connect(mapStateToProps)(AppNavigator);
