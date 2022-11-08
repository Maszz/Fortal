import {FunctionComponent} from 'react';
import {View, Text} from 'native-base';
import {HomeScreenTypes} from '../../types';
const ProfileScreen: FunctionComponent<
  HomeScreenTypes.ProfileScreenProps
> = () => {
  return (
    <View flex={10} backgroundColor={'white'}>
      <Text>Profile Screen</Text>
    </View>
  );
};
export default ProfileScreen;
