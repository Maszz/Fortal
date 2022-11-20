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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const Home: FunctionComponent<HomeScreenTypes.HomeScreenProps> = ({route}) => {
  const {logout, user} = useAuth();
  const tags = [
    {name: 'ยิงธนู', image: require('../../assets/filter_icon/archer.png')},
    {name: 'วิทยาศาสตร์', image: require('../../assets/filter_icon/atom.png')},
    {
      name: 'แบตมินตัน',
      image: require('../../assets/filter_icon/badminton.png'),
    },
    {name: 'เดินเล่น', image: require('../../assets/filter_icon/bird.png')},
    {
      name: 'บอร์ดเกม',
      image: require('../../assets/filter_icon/boardGame.png'),
    },
    {name: 'อ่านหนังสือ', image: require('../../assets/filter_icon/books.png')},
    {
      name: 'ปั่นจักรยาน',
      image: require('../../assets/filter_icon/cycryng.png'),
    },
    {
      name: 'เที่ยวต่างประเทศ',
      image: require('../../assets/filter_icon/earth.png'),
    },
    {name: 'gallery', image: require('../../assets/filter_icon/fibonachi.png')},
    {name: 'ตกปลา', image: require('../../assets/filter_icon/fish.png')},
    {name: 'game', image: require('../../assets/filter_icon/gamePlay.png')},
    {name: 'music', image: require('../../assets/filter_icon/headphone.png')},
    {name: 'ปีนเขา', image: require('../../assets/filter_icon/hiking.png')},
    {name: 'ธรรมชาติ', image: require('../../assets/filter_icon/leave.png')},
    {
      name: 'ผีเสื้อราตรี',
      image: require('../../assets/filter_icon/moonAndStar.png'),
    },
    {name: 'รักสัตว์', image: require('../../assets/filter_icon/pet.png')},
    {
      name: 'ถ่ายรูป',
      image: require('../../assets/filter_icon/photographer.png'),
    },
    {name: 'เล่นดนตรี', image: require('../../assets/filter_icon/piano.png')},
    {name: 'ทะเล', image: require('../../assets/filter_icon/sea.png')},
    {name: 'ชอปปิง', image: require('../../assets/filter_icon/shopping.png')},
    {name: 'football', image: require('../../assets/filter_icon/socker.png')},
    {name: 'เรียน', image: require('../../assets/filter_icon/study.png')},
    {name: 'กลางแจ้ง', image: require('../../assets/filter_icon/sun.png')},
    {
      name: 'ไม่ร้อน',
      image: require('../../assets/filter_icon/sunAndCould.png'),
    },
    {name: 'ว่ายน้ำ', image: require('../../assets/filter_icon/swimming.png')},
    {name: 'café', image: require('../../assets/filter_icon/tulip.png')},
    {name: 'movie', image: require('../../assets/filter_icon/TV.png')},
  ];
  const chunkSize = Math.ceil(tags.length / 2);

  // const {data, refetch} = useGetEventListQuery({offset: 0, limit: 10});
  const [refreshing, setRefreshing] = useState(false);
  const {
    eventList: data,
    refetch,
    loadMore,
    refocus,
    isLoading,
  } = useGetEventList('home');
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
  // useEffect(() => {
  //   if(!isLoading) {

  //   }
  // }, [isLoading]);
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
            <Box flexDirection={'row'} paddingTop={3}>
              {tags.slice(0, chunkSize).map((tag, index) => {
                return (
                  <Box
                    justifyContent={'center'}
                    alignItems={'center'}
                    w={70}
                    h={60}>
                    <Image
                      source={tag.image}
                      alt={tag.name}
                      style={{
                        // borderRadius: 100,
                        backgroundColor: 'white',
                        width: 30,
                        height: 30,
                        // borderWidth: 3,
                        borderColor: '#8C84D4',
                        // transform: [{scale: 0.8}],
                      }}
                    />
                    <Text
                      fontSize={12}
                      fontWeight={'normal'}
                      color={'#232259'}
                      mt={1}>
                      {tag.name}
                    </Text>
                  </Box>
                );
              })}
            </Box>
            {/* row 2 */}
            <Box flexDirection={'row'} paddingTop={3}>
              {tags.slice(chunkSize, tags.length).map((tag, index) => {
                return (
                  <Box
                    justifyContent={'center'}
                    alignItems={'center'}
                    w={70}
                    h={60}>
                    <Image
                      source={tag.image}
                      alt={tag.name}
                      style={{
                        // borderRadius: 100,
                        backgroundColor: 'white',
                        width: 30,
                        height: 30,
                        // borderWidth: 3,
                        borderColor: '#8C84D4',
                        // transform: [{scale: 0.8}],
                      }}
                    />
                    <Text
                      fontSize={12}
                      fontWeight={'normal'}
                      color={'#232259'}
                      mt={1}>
                      {tag.name}
                    </Text>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </ScrollView>
      </Box>
      {/* portion 3 == tag filter */}
      <HStack
        flex={5}
        flexDirection={'column'}
        paddingTop={2}
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
            const avarar =
              item?.creator?.profile?.avarar === null
                ? {avatar: undefined}
                : {avatar: Config.apiBaseUrl + item?.creator?.profile?.avarar};
            const paticipant = item?.participants.map(item => {
              if (item?.profile?.avarar === null) {
                return {avatar: undefined};
              }
              return {avatar: Config.apiBaseUrl + item?.profile?.avarar};
            });
            return (
              <EventCard
                onPress={() => {
                  console.log('press', item.id);
                  SheetManager.show('eventCard-sheet', {
                    payload: {
                      eventId: item.id,
                    },
                  });
                }}
                style={{
                  marginVertical: 7,
                  marginBottom: 20,
                }}
                title={item.name}
                date={moment(item.startDate).format('DD MMMM YYYY')}
                description={item.description}
                colors={[item.eventColors.c1, item.eventColors.c2]}
                avatarList={[avarar, ...paticipant]}
                key={index}
              />
            );
          })}
        </Box>

        {/* row 2 */}
      </HStack>
    </ScrollView>
  );
};

export default Home;
