import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, View, RefreshControl } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Text } from 'react-native-elements';
import { Colors } from '../../config/theme';
import SaleCard from '../../components/SaleCard/SaleCard';
import TextModal from '../../components/modals/TextModal';
import createStyles from './createStyles';
import { formatNumber } from '../../utils/numbers';

import { getHistory } from '../../redux/auth/authActions';

const UserHistory = props => {
  
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    (async () => {
      await getUserHistory();
    })();
  }, []);

  const getUserHistory = async () => {
    try {
      setLoading(true);
      let action = getHistory(props.user._id, props.token);
      action.payload = await action.payload;
      setLoading(false);
      
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

  // @TODO: actualizar historial cada vez que se realiza una compra
  const history = props.history || [];
  const debt = props.debt || null;
  const styles = createStyles();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={loading}
            onRefresh={getUserHistory}
            colors={[Colors.primary, Colors.light]}
          />
        }
      >
        {
          history
          .sort((a,b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
          .map(sale => <SaleCard key={sale._id} sale={sale} />)
        }
        <View height={100} />
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.debtContainer}>
          <Text style={styles.tag}>TOTAL A PAGAR</Text>
          {debt && <Text h4 style={styles.value}>${formatNumber(debt)}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
}

/**
 * Obtenemos la data del store
 * @param { Object } state
 */
const mapStateToProps = ( state ) => {
  return {
    user: state.authReducer.user,
    token: state.authReducer.token,
    history: state.authReducer.history,
    debt: state.authReducer.debt,
  }
}

//Conectando con redux
export default connect(mapStateToProps)(UserHistory);