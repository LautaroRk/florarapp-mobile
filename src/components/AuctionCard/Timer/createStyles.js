import { StyleSheet } from 'react-native';
import { Colors } from '../../../config/theme'; 

const createStyles = props => StyleSheet.create({
  timerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  timerIcon: {
    marginRight: 5,
  },
  auctionDateContainer: {
    alignSelf: 'flex-end',
  },
});

export default createStyles;