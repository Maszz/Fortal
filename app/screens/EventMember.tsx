import {
  View,
  Text,
  Box,
  HStack,
  Image,
  Divider,
  VStack,
  FlatList,
  Avatar,
  Spacer,
  Pressable,
} from 'native-base';
import {FunctionComponent} from 'react';
import {EventMemberScreenProps} from '../types';
import {TouchableOpacity} from 'react-native';
import {useGetEventMemberByIdQuery} from '../redux/apis';
import {Config} from '../env';
const EventMember: FunctionComponent<EventMemberScreenProps> = ({
  navigation,
  route,
}) => {
  const {eventId} = route.params;
  const {data, isSuccess, refetch} = useGetEventMemberByIdQuery({eventId});
  return (
    <View flex={10} backgroundColor={'white'}>
      <Box
        flex={1.2}
        backgroundColor={'white'}
        shadow={2}
        justifyContent={'flex-end'}>
        <Box
          marginX={36}
          marginBottom={3}
          flexDirection={'row'}
          justifyContent={'space-between'}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              width={30}
              height={24.36}
              alt="key icon"
              source={require('../assets/back_icon.png')}
              tintColor={'#232259'}
            />
          </TouchableOpacity>
          <Text fontSize={16} color={'#232259'} fontWeight={'bold'}>
            Member
          </Text>
          <Image
            alt="key icon"
            source={require('../assets/gear_icon.png')}
            style={{
              opacity: 0,
            }}
          />
        </Box>
      </Box>
      <Box flex={8.8} marginX={36}>
        <FlatList
          data={data}
          renderItem={({item}) => {
            const avatar =
              item.avatar === undefined || item.avatar === null
                ? undefined
                : Config.apiBaseUrl + item.avatar;
            return (
              <Pressable
              // onPress={e => {
              //   if (e.nativeEvent.pageX < width) {
              //     navigation.navigate('OtherProfileScreen', {
              //       userId: item.username,
              //     });
              //   }
              // }}
              >
                <Box
                  pl={['0', '4']}
                  pr={['0', '5']}
                  py="4"
                  borderBottomWidth={1}
                  borderBottomColor={'#8B9093'}>
                  <HStack space={[2, 3]} justifyContent="space-between">
                    <Avatar
                      borderColor={'#8172F7'}
                      borderWidth={2}
                      size="60px"
                      source={{
                        uri: avatar,
                      }}
                    />
                    <VStack marginLeft={2} w={'75%'}>
                      <HStack
                        justifyContent={'space-between'}
                        paddingBottom={2}>
                        <Text
                          color="#232259"
                          bold
                          fontSize={12}
                          w={'50%'}
                          numberOfLines={1}>
                          {item.username}
                        </Text>
                      </HStack>
                      <Text
                        textAlign={'left'}
                        width={'60%'}
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                        minHeight={10}
                        color={'#232259'}
                        marginTop={-2}
                        fontSize={14}
                        fontWeight={'normal'}>
                        {item.bio || 'No bio'}
                      </Text>
                    </VStack>
                    <Spacer />
                  </HStack>
                </Box>
              </Pressable>
            );
          }}
        />
      </Box>
    </View>
  );
};
export default EventMember;
