import React, {FunctionComponent} from 'react';
import {useTranslation} from 'react-i18next';
import {store, RootState} from '../redux';
import {useSelector, useDispatch} from 'react-redux';
import {countAction, persistor} from '../redux';
import {Box, Text, ScrollView, Button} from 'native-base';
import {useChat} from '../hooks/useChat';
// import type {HomeScreenProps} from '../types';

/**
 * Dummy Components for testing code
 * @param param0
 * @returns
 */
const App: FunctionComponent = () => {
  const {t} = useTranslation();
  const count = useSelector<RootState, RootState['count']>(
    state => state.count,
  );
  const dispatch = useDispatch();
  // const {chatMessages, sendMessage, fetchMore} = useChat({
  //   senderName: 'testName2',
  //   eventChatId: '6321e46d8abaf1746d118374',
  // });

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#222B45'}}>
      <Text>{t('common:ok')}</Text>
      <Text>Test</Text>
      <Text>{count.value}</Text>
      <Text onPress={() => dispatch(countAction.increment())}>+</Text>
      {/* <Text onPress={() => fetchMore()}>Fetchmore</Text>
      <Text
        onPress={() =>
          sendMessage({message: 'teslkjlkjt', senderName: 'testname'})
        }>
        Send
      </Text> */}
      <Button
        onPress={
          () => {}
          // navigation.navigate('Login', {eventId: '6321e46d8abaf1746d118374'})
        }>
        Send
      </Button>

      <Box>Boxxxx</Box>
      {/* {chatMessages?.map(message => {
        return (
          <Box key={message.date}>
            <Text>
              {message.senderName} : {message.message}
            </Text>
          </Box>
        );
      })} */}
      {/* <Chat /> */}
    </ScrollView>
  );
};

export default App;
