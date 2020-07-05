import { StyleSheet } from 'react-native';
import { Colors } from '../../../config/theme'; 

const createStyles = props => StyleSheet.create({
  container: {
    width: '95%',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    width: '100%',
    textAlign: 'center',
    //                                                          >40 : >20 : <20
    fontSize: props.title.length > 20 ? props.title.length > 40 ? 16 : 19 : 22,
    fontWeight: 'bold',
    borderBottomColor: Colors.lighter,
    borderBottomWidth: 2,
    marginHorizontal: 5,
    marginBottom: 20,
    paddingBottom: 10,
  },

  // INFO
  info: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tags: {
    marginRight: 20,
  },
  values: {
    marginLeft: 20,
  },
  tag: {
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'right',
    color: Colors.grey,
    marginBottom: 4,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },

  // CONTADOR
  counterTitle: {
    color: Colors.grey,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    borderBottomColor: Colors.lighter,
    borderBottomWidth: 2,
    margin: 6,
    marginTop: 10,
    paddingBottom: 5,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    margin: 10,
    marginTop: 0,
  },
  counter: {
    width: 50,
    textAlign: 'center',
  },
  counterButton: {
    width: '20%',
  },

  // PRECIO
  totalPrice: {
    alignSelf: 'flex-start',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
  },

  // BOTONES
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: '48%',
    alignSelf: 'center'
  },
  legalText: {
    color: Colors.grey,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default createStyles;