import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View, 
  SafeAreaView, 
  RefreshControl,
} from 'react-native';
import { 
  Text,
} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import AuctionCard from '../../components/AuctionCard/AuctionCard';
import createStyles from './createStyles';
import TextModal from '../../components/modals/TextModal';
import { Colors } from '../../config/theme';

import { getAuctions, updateStock } from '../../redux/auctions/auctionsActions';

import socket from '../../apis/socket';

const Home = props => {

  const [loading, setLoading] = useState(false);
  const [fetchInterval, setFetchInterval] = useState(null);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  // Frecuencia con la que se vuelve a pedir las subastas
  const fetchFreq = 60000;

  useEffect(() => {
    (async () => {
      await getAuctionList();
      const intervalId = setInterval(async () => {
        await getAuctionList();
      }, fetchFreq);
      setFetchInterval(intervalId);
    })();
    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  // cuando se recibe un aviso de compra por socket
  useEffect(() => {
    socket.on("stock update", auction => {
      console.log("stock update", auction);
      props.dispatch(updateStock(auction._id, auction.stock_left));
    });
    return () => {
      socket.disconnect();
    }
  }, []);

  const getAuctionList = async () => {
    try {
      setLoading(true);

      let action = getAuctions();
      action.payload = await action.payload;
      
      if (action.payload.hasOwnProperty('error')) {
        setModalText(action.payload.error.message);
        setModalVisible(true);
      } else {
        props.dispatch(action);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const { auctions } = props;

  const styles = createStyles({loading});

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl 
            refreshing={loading}
            onRefresh={getAuctionList}
            colors={[Colors.primary, Colors.light]}
          />
        }
      >
        { !auctions.length && !loading ?
            <Text style={styles.noDataText}>
              No hay subastas disponibles en este momento
            </Text>
          : auctions.map(auction =>
            <AuctionCard
              key={auction.auction_id}
              auction={auction}
              fetchFreq={fetchFreq}
            />
          )
        }
        <View style={{height: 20}}/>
      </ScrollView>
      
      <TextModal
        isVisible={modalVisible}
        text={modalText}
        hideModal={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

/**
 * Obtenemos la data del store
 * @param { Object } state
 */
const mapStateToProps = ( state ) => {
  return {
    auctions: state.auctionsReducer.auctions,
    user: state.authReducer.user,
  }
}

//Conectando con redux
export default connect(mapStateToProps)(Home);