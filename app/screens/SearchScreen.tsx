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
} from 'native-base';
import {FunctionComponent, useEffect, useState} from 'react';
import {SearchScreenProps} from '../types';
import Icon from 'react-native-vector-icons/AntDesign';
import SearchBar from '../components/SearchBar';
import {initialState} from '../redux/reducers/navigation';
import {Query} from '../graphql/graphql';
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
    <View paddingX={4} backgroundColor={'white'} w={'100%'} h={'100%'}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
                          ? 'pending'
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

  return (
    <Pressable
      py={4}
      // height={'20'}
      onPress={() => {
        console.log('item', item);
        navigation.navigate('OtherProfileScreen', {
          userId: item.content,
        });
      }}>
      <HStack justifyContent={'space-around'}>
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
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}></LinearGradient>
        </VStack>
        <VStack w={'50%'}>
          <Text
            alignSelf={'flex-start'}
            fontWeight={'bold'}
            px={'1'}
            numberOfLines={1}>
            {item?.content} {/* {item?.displayName}@ */}
          </Text>
          <Text numberOfLines={2} ellipsizeMode={'tail'} minHeight={10}>
            {item?.bio ? item?.bio : 'No bio'}
          </Text>
        </VStack>
        <Box justifyContent={'flex-end'} alignItems={'flex-end'}>
          <Button
            variant={'outline'}
            rounded={'2xl'}
            borderWidth={2}
            borderColor={'#8172F7'}
            onPress={() => {
              console.log(userId);
              followingById({
                userId: userId,
                followingUserId: item.id,
              })
                .unwrap()
                .then((following: any) => {
                  console.log('following', following);
                  refetch();
                });
            }}
            disabled={
              followStatus === 'pending' || followStatus === 'following'
                ? true
                : false
            }
            width={75}>
            <Text color={'#8172F7'}>{followStatus}</Text>
          </Button>
        </Box>
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
      py={4}
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
      <HStack>
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
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}></LinearGradient>
        </VStack>
        <VStack w={'75%'} pl={3}>
          <Text alignSelf={'flex-start'} fontWeight={'bold'} px={'1'}>
            {item?.content}
          </Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'}>
            date :{' '}
            {item?.date
              ? moment(item?.date)
                  .tz('Asia/Bangkok')
                  .format('DD MMM YYYY, h:mm a')
              : ''}
          </Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'}>
            location: {item?.location}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};
