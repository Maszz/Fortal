import {
  Text,
  View,
  Heading,
  Input,
  VStack,
  HStack,
  ScrollView,
  Box,
  Divider,
  Button,
  Pressable,
  Image,
  Avatar,
} from 'native-base';
import {FunctionComponent, useEffect, useState} from 'react';
import {SearchScreenProps} from '../types';
import Icon from 'react-native-vector-icons/AntDesign';
import SearchBar from '../components/SearchBar';
import {initialState} from '../redux/reducers/navigation';
import {Query} from '../graphql/graphql';
import {Dimensions} from 'react-native';
import {
  useGetSearchItemQuery,
  QueryItem,
  SearchResponse,
  useLazyGetSearchItemQuery,
} from '../redux/apis/SearchApi';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import LinearGradient from 'react-native-linear-gradient';
import {SheetManager} from 'react-native-actions-sheet';
import {
  useFollowingByidMutation,
  useGetFollowingMutation,
  useGetFollowingRequestToMutation,
} from '../redux/apis';
import moment from 'moment';
import {useAuth} from '../hooks/useAuth';
import {GetFollowerResponse} from '../redux/apis';
import {Config} from '../env';
const SearchScreen: FunctionComponent<SearchScreenProps> = () => {
  const [searchInput, setSearchInput] = useState('');
  const {user} = useAuth();
  const [item, setItem] = useState([]);
  const {data: searchResult} = useGetSearchItemQuery({
    term: searchInput,
    u: user.username,
  });
  const [getFollowing, {data: following}] = useGetFollowingMutation();
  //   const [postSearchItem, result] = usePostSearchItemMutation();
  const [clearResult, setClearResult] = useState(true);
  const onSearchSubmit = (term: string) => {
    setSearchInput(term);

    console.log('New Search submit', term);
    // TODO: Make a request to the API
  };
  const [follow, setFollow] = useState<GetFollowerResponse[]>(
    [] as GetFollowerResponse[],
  );
  const [followingTo, setFollowingTo] = useState([]);
  const [getFollowingReqestTo, {data: followingToData}] =
    useGetFollowingRequestToMutation();
  useEffect(() => {
    console.log('Search Result', searchResult);
    console.log('Following', following);
    console.log('user', user);
  }, [searchResult, following]);
  useEffect(() => {
    getFollowing(user.username);
    getFollowingReqestTo(user.username);
  }, []);
  useEffect(() => {
    if (following) {
      setFollow(following);
    }
  }, [following]);
  useEffect(() => {
    if (followingToData) {
      setFollowingTo(followingToData);
    }
  });
  return (
    <View paddingX={'5%'} backgroundColor={'white'} w={'100%'} h={'100%'}>
      <Text mt={5}>Search</Text>
      <Box>
        <SearchBar
          onSearchSubmit={term => {
            onSearchSubmit(term);
          }}
          clearResults={v => {
            setClearResult(v);
          }}
        />
      </Box>
      <Text mt={'4'}>Search</Text>
      <Divider my={2} />
      <ScrollView showsVerticalScrollIndicator={false} paddingX={'1%'}>
        <VStack>
          {!clearResult
            ? searchResult?.map((item: SearchResponse, index: number) => {
                if (item.type === 'user') {
                  console.log('User cmap', item);
                  console.log('Following', following);

                  return (
                    <SearchItemUser
                      item={item}
                      key={index}
                      userId={user.id}
                      followStatus={
                        followingTo?.findIndex(
                          (v: string) => v === item.content,
                        ) !== -1
                          ? 'requested'
                          : follow.findIndex(
                              v => v.username === item.content,
                            ) !== -1
                          ? 'following'
                          : 'follow'
                      }
                      refetch={() => {
                        getFollowing(user.username);
                        getFollowingReqestTo(user.username);
                      }}
                    />
                  );
                } else {
                  return <SearchItemEvent item={item} key={index} />;
                }
              })
            : null}
        </VStack>
      </ScrollView>
    </View>
  );
};
export default SearchScreen;
export interface SearchItemProps {
  item: SearchResponse;
  userId: string;
  followStatus: string;
  refetch: () => void;
}
const SearchItemUser: FunctionComponent<SearchItemProps> = ({
  item,
  userId,
  followStatus,
  refetch,
}) => {
  const [followingById, data] = useFollowingByidMutation();
  const navigation = useSelector<
    RootState,
    RootState['navigation']['stackNavigation']
  >(state => state.navigation.stackNavigation);
  // const [data, setData] = useState<any>();
  // const {data} = useGetSearchItemContextQuery(item, {});
  const width = Dimensions.get('window').width * 0.65;
  return (
    <Pressable
      py={3}
      // height={'20'}
      onPress={event => {
        console.log('item', item);
        if (event.nativeEvent.pageX <= width) {
          navigation.navigate('OtherProfileScreen', {
            userId: item.content,
          });
        }
        // console.log('event', event.nativeEvent.changedTouches);
        // console.log(Dimensions.get('window').width * 0.65);
        // navigation.navigate('OtherProfileScreen', {
        //   userId: item.content,
        // });
      }}>
      <HStack
        justifyContent={'space-around'}
        borderBottomWidth={1}
        alignItems={'center'}
        borderBottomColor={'#C4C4C4'}
        paddingBottom={3}>
        <VStack w={'20%'}>
          {/* <Text>Search</Text> */}
          <Avatar
            alignSelf={'center'}
            justifyContent={'center'}
            borderColor={'#8172F7'}
            borderWidth={2}
            size="70px"
            source={
              item.avarar === null
                ? require('../assets/wonyoung_icon.png')
                : {
                    uri: Config.apiBaseUrl + item.avarar,
                  }
            }
          />
        </VStack>
        <VStack w={'50%'} pl={3} mx={2}>
          <Text
            width={'90%'}
            color={'#232259'}
            alignSelf={'flex-start'}
            numberOfLines={1}
            fontSize={15}
            fontWeight={'bold'}>
            {item?.content} {/* {item?.displayName}@ */}
          </Text>
          <Text
            textAlign={'left'}
            width={'90%'}
            numberOfLines={2}
            ellipsizeMode={'tail'}
            minHeight={10}
            color={'#232259'}
            fontSize={14}
            fontWeight={'normal'}>
            {item?.bio ? item?.bio : 'No bio'}
          </Text>
        </VStack>
        <TouchableOpacity
          onPress={() => {
            followingById({
              userId: userId,
              followingUserId: item.id,
            })
              .unwrap()
              .then((following: any) => {
                console.log('following', following);
                refetch();
              });
            // console.log(e.nativeEvent);
          }}
          style={{
            width: 110,
            height: 35,
          }}
          disabled={
            followStatus === 'requested' || followStatus === 'following'
          }>
          <Box
            backgroundColor={'white'}
            alignItems={'center'}
            justifyContent={'center'}
            height={35}
            minWidth={110}
            variant={'outline'}
            rounded={'full'}
            borderWidth={2}
            borderColor={
              followStatus === 'follow'
                ? '#8172F7'
                : followStatus === 'requested'
                ? '#FFAECB'
                : '#C2C3F3'
            }
            width={75}>
            <Text
              fontSize={14}
              color={
                followStatus === 'follow'
                  ? '#8172F7'
                  : followStatus === 'requested'
                  ? '#FFAECB'
                  : '#C2C3F3'
              }>
              {followStatus}
            </Text>
          </Box>
        </TouchableOpacity>
      </HStack>
    </Pressable>
  );
};
export interface SearchItemEventProps {
  item: SearchResponse;
}
const SearchItemEvent: FunctionComponent<SearchItemEventProps> = ({item}) => {
  return (
    <Pressable
      py={3}
      onPress={() => {
        // navigation.navigate('EventScreen', {
        //   eventId: item.id ? item.id : '',
        // });
        SheetManager.show('eventCard-sheet', {
          payload: {
            eventId: item.id,
          },
        });
      }}>
      <HStack
        borderBottomWidth={1}
        borderBottomColor={'#C4C4C4'}
        paddingBottom={3}>
        <VStack w={'20%'}>
          {/* <Text>Search</Text> */}
          <LinearGradient
            colors={['#FEDDE0', '#8172F7']}
            useAngle={true}
            angle={0}
            angleCenter={{x: 0.5, y: 0.65}}
            style={{
              flex: 1,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}></LinearGradient>
        </VStack>
        <VStack w={'75%'} pl={3} mx={2}>
          <Text
            color={'#232259'}
            alignSelf={'flex-start'}
            fontSize={15}
            fontWeight={'bold'}>
            {item?.content}
          </Text>
          <Text
            color={'#232259'}
            numberOfLines={1}
            fontSize={14}
            fontWeight={'normal'}
            ellipsizeMode={'tail'}>
            date{', '}
            {item?.date
              ? moment(item?.date)
                  .tz('Asia/Bangkok')
                  .format('DD MMM YYYY  |  h:mm a')
              : ''}
          </Text>
          <HStack
            marginY={1}
            justifyContent={'space-between'}
            marginRight={'2%'}
            // opacity={0.8}
          >
            <HStack
              width={'50%'}
              height={6}
              backgroundColor={'#BFBFBF'}
              borderRadius={'full'}
              paddingX={3}>
              <Image
                marginRight={2}
                alignSelf={'center'}
                source={require('../assets/pin_icon.png')}
              />
              <Text
                alignSelf={'center'}
                numberOfLines={1}
                ellipsizeMode={'tail'}
                color={'white'}
                fontSize={14}>
                location: {item?.location}Hello
              </Text>
            </HStack>
            <Text>people/numbers</Text>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
};
