import {FunctionComponent, useState, useEffect} from 'react';
import {View, Text, Divider, Box, ScrollView} from 'native-base';
import {HomeScreenTypes} from '../../types';
import {StyleSheet, TouchableOpacity, RefreshControl} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EventCard from '../../components/EventCard';
import {useGetEventList} from '../../hooks/useEventList';
import {RootState} from '../../redux';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const FavoriteScreen: FunctionComponent<
  HomeScreenTypes.FavoriteScreenProps
> = () => {
  const {eventList: data, refetch, loadMore, refocus} = useGetEventList('user');
  const [refreshing, setRefreshing] = useState(false);
  const {stackNavigation} = useSelector<RootState, RootState['navigation']>(
    (state: RootState) => state.navigation,
  );

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      console.log('focused trigger');
      refocus();
    }
  }, [isFocused]);
  return (
    <ScrollView
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            refetch();
            setRefreshing(false);
          }}
        />
      }
      pagingEnabled={false}
      backgroundColor={'white'}>
      <Box paddingX={5} paddingY={5}>
        <Text fontSize={14} fontWeight={'normal'}>
          Joing
        </Text>
        <Divider my={4} />
        <ScrollView
          horizontal={true}
          height={230}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={400}
          onScroll={({nativeEvent}) => {
            const paddingToRight = 40;
            const width = nativeEvent.layoutMeasurement.width;
            const contentoffset = nativeEvent.contentOffset.x;
            const contentSize = nativeEvent.contentSize.width;
            // console.log('width', width);
            // console.log('contentoffset', contentoffset);
            // console.log('contentSize', contentSize);
            if (width + contentoffset >= contentSize - paddingToRight) {
              loadMore();
            }
          }}
          pagingEnabled={false}>
          <Box flexDirection={'row'} justifyContent={'space-between'}>
            {data.map((item, index) => {
              return (
                <TouchableOpacity key={index}>
                  <EventCard
                    onPress={() => {
                      stackNavigation.navigate('EventScreen', {
                        eventChatId: item?.eventChat.id,
                      });
                    }}
                    title={item.name}
                    date={item.startDate}
                    description={item.description}
                    colors={[item.eventColors.c1, item.eventColors.c2]}
                    style={{marginRight: 10}}
                  />
                </TouchableOpacity>
              );
            })}
          </Box>
        </ScrollView>
      </Box>
      <Box paddingX={5} paddingY={5}>
        <Text fontSize={14} fontWeight={'normal'}>
          History
        </Text>
        <Divider my={4} />
        {/* this column, activities component is simila to "Activities near me" in home.tsx */}
        {/* Do not forget to add activities component */}
      </Box>
    </ScrollView>
  );
};
export default FavoriteScreen;
