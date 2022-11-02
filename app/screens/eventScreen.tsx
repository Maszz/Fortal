import {Box, Text} from 'native-base';
import {FunctionComponent} from 'react';
import {EventScreenProps} from '../types';
const EventScreen: FunctionComponent<EventScreenProps> = ({
  navigation,
  route,
}) => {
  return (
    <Box flex={1} bg="white">
      <Box flex={1} bg="white" justifyContent="center" alignItems="center">
        <Text>Event Screen : {route.params.eventId}</Text>
      </Box>
    </Box>
  );
};
export default EventScreen;
