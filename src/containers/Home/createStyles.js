import { StyleSheet } from 'react-native';
import { Colors } from '../../config/theme';

const createStyles = props => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollView: {
    width: '98%',
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