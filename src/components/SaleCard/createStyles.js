import { StyleSheet } from 'react-native';
import { Colors } from '../../config/theme';

const createStyles = props => StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    borderBottomWidth: 2,
    borderColor: Colors.lighter,
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 2,
  },
  headerLeft: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  quantity: {
    marginRight: 6,
    fontSize: 16,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 15,
  },
  date: {
    width: '35%',
    fontSize: 15,
    alignSelf: 'flex-end',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: Colors.light,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  left: {
    width: '65%',
    flexDirection: 'column',
  },
  right: {
    width: '35%',
    flexDirection: 'column',
  },
  total: {
    fontWeight: 'bold',
  },
});

export default createStyles;