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
});

export default createStyles;