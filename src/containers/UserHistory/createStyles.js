import { StyleSheet } from 'react-native';
import { Colors } from '../../config/theme';

const createStyles = props => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollView: {
    width: '100%',
    paddingBottom: 500,
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  debtContainer: {
    alignItems: 'center',
  },
  tag: {
    fontWeight: 'bold',
    color: Colors.lighter,
  },
  value: {
    color: Colors.white,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: Colors.grey,
    marginTop: 20,
    width: '70%',
    alignSelf: 'center',
  },
});

export default createStyles;