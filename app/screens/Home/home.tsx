import {View, Text, Button, Box, Divider, Image, HStack} from 'native-base';
import {useAuth} from '../../hooks/useAuth';
import {HomeScreenTypes} from '../../types';
import {FunctionComponent, useState} from 'react';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Config} from '../../env';
import {useSelector, useDispatch} from 'react-redux';
import {store, RootState} from '../../redux';
import {useGetEventList} from '../../hooks/useEventList';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  RefreshControl,
  NativeScrollEvent,
} from 'react-native';
import {Line} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import EventCard from '../../components/EventCard';
import {useGetEventListQuery} from '../../redux/apis';
import 'moment-timezone';
import moment from 'moment';
import {SheetManager} from 'react-native-actions-sheet';
import {useIsFocused} from '@react-navigation/native';

const Home: FunctionComponent<HomeScreenTypes.HomeScreenProps> = ({route}) => {
  const {logout, user} = useAuth();
  // const {data, refetch} = useGetEventListQuery({offset: 0, limit: 10});
  const [refreshing, setRefreshing] = useState(false);
  const {eventList: data, refetch, loadMore, refocus} = useGetEventList('home');
  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
    console.log('refreshing');
  };
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      console.log('focused trigger');
      refocus();
    }
  }, [isFocused]);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          loadMore();
        }
      }}
      scrollEventThrottle={400}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      // pagingEnabled={true}
      style={{flex: 10, backgroundColor: 'white'}}>
      {/* portion 1 == > story */}
      <Box
        style={{
          flex: 1.5,

          paddingTop: 15,
          paddingHorizontal: 20,
          marginVertical: 10,
        }}>
        <Text fontSize={14} fontWeight={'medium'}>
          Random activities
        </Text>
        <Divider my={2.5} bg="black" />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}>
          <Box
            style={{
              flex: 0.5,
              flexDirection: 'row',
            }}>
            {/* add this many box */}
            <Box
              style={{
                borderRadius: 100,
                backgroundColor: 'white',
                width: 60,
                height: 60,
                borderWidth: 3,
                borderColor: '#8C84D4',
              }}
            />
          </Box>
        </ScrollView>
      </Box>
      {/* portion 2 ==> type or hash tag */}
      <Box
        style={{
          flex: 2.5,
          marginVertical: 10,
          paddingHorizontal: 20,
        }}>
        <Text fontSize={14} fontWeight={'medium'}>
          Types filter
        </Text>
        <Divider my={2.5} bg="black" />

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}>
          {/* one tag item grop box */}
          {/* loop this box for manyb tag */}
          <Box flexDirection={'column'}>
            {/* row 1 */}
            <Box flexDirection={'column'} alignItems={'center'} paddingTop={3}>
              <Box
                style={{
                  borderRadius: 100,
                  backgroundColor: 'white',
                  width: 40,
                  height: 40,
                  borderWidth: 3,
                  borderColor: '#8C84D4',
                }}
              />
              <Text fontSize={12} fontWeight={'normal'} color={'black'}>
                tag1
              </Text>
            </Box>
            {/* row 2 */}
            <Box flexDirection={'column'} alignItems={'center'} paddingTop={3}>
              <Box
                style={{
                  borderRadius: 100,
                  backgroundColor: 'white',
                  width: 40,
                  height: 40,
                  borderWidth: 3,
                  borderColor: '#8C84D4',
                }}
              />
              <Text fontSize={12} fontWeight={'normal'} color={'black'}>
                tag1
              </Text>
            </Box>
          </Box>
        </ScrollView>
      </Box>
      {/* portion 3 == tag filter */}
      <HStack
        flex={5}
        flexDirection={'column'}
        paddingTop={30}
        // paddingY={20}
        style={{
          // flex: 5,
          // flexDirection: 'column',
          paddingHorizontal: 20,
          // paddingTop: 30,
        }}>
        <Text fontSize={14} fontWeight={'medium'}>
          Activities near me
        </Text>
        <Divider my={2.5} bg="black" marginBottom={5} />
        {/* copy this box to make column */}
        <Box
          flexDirection={'row'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          // marginY={4}
          // marginTop={4}
          w={'100%'}>
          {data?.map((item, index: number) => {
            return (
              <EventCard
                onPress={() => {
                  SheetManager.show('eventCard-sheet', {
                    payload: {
                      eventId: item.id,
                    },
                  });
                }}
                style={{marginVertical: 7, marginBottom: 20}}
                title={item.name}
                date={moment(item.startDate).format('DD MMMM YYYY')}
                description={item.description}
                colors={[item.eventColors.c1, item.eventColors.c2]}
                key={index}
              />
            );
          })}
        </Box>

        {/* row 2 */}
      </HStack>

      <Button onPress={() => logout()}>btn</Button>
    </ScrollView>
  );
};

export default Home;
