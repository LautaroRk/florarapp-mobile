import { StyleSheet } from 'react-native';
import { Colors } from '../../config/theme'; 

const createStyles = props => StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderWidth: 2,
    borderColor: Colors.light,
  },
  header: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: Colors.light,
    // borderWidth: 1, //debug
  },
  headerLeft: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    // borderWidth: 1, //debug
  },
  stock: {
    width: '21%',
    fontSize: 24,
    fontWeight: props.stock_left > 100 ? '500' : 'bold',
    color: props.stock_left > 100 ? Colors.black : Colors.error,
  },
  title: {
    width: '79%',
    //                                                          >40 : >20 : <20
    fontSize: props.title.length > 20 ? props.title.length > 40 ? 15 : 18 : 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 0.7,
    flexDirection: 'row',
    alignContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 15,
    // borderWidth: 1, //debug
  },
  imageContainer: {
    width: '43%',
    // borderWidth: 1, //debug
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    borderRadius: 5,
    // borderWidth: 1, //debug
  },

  // Info
  info: {
    width: '60%',
    flexDirection: 'row',
    paddingLeft: 35,
    // borderWidth: 1, //debug
  },
  tags: {
    justifyContent: 'flex-start',
    width: '45%',
    // borderWidth: 1, //debug
  },
  values: {
    justifyContent: 'flex-start',
    width: '55%',
    // borderWidth: 1, //debug
  },
  tag: {
    fontWeight: '400',
    color: Colors.grey,
    marginBottom: 2,
  },
  value: {
    fontWeight: '400',
    color: Colors.black,
    marginBottom: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingTop: 12,
  },
  timerContainer: {
    flexDirection: 'row',
    width: '50%',
    alignSelf: 'flex-end',
  },
  timerIcon: {
    marginRight: 5,
  },
  auctionDateContainer: {
    justifyContent: 'flex-end',
    width: '100%',
  },
  buttonContainer: {
    width: '48%',
  },
  modalContainer: {
    width: '95%',
    alignItems: 'center',
    padding: 20,
  },
  legalText: {
    color: Colors.grey,
    marginTop: 5,
    textAlign: 'center',
  },
  
  // Buttons
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  modalButton: {
    width: '48%',
    alignSelf: 'center'
  },
});

export default createStyles;