import {FunctionComponent} from 'react';
import {View, Text} from 'native-base';
import {HomeScreenTypes} from '../../types';
const ProfileScreen: FunctionComponent<
  HomeScreenTypes.ProfileScreenProps
> = () => {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
};
export default ProfileScreen;
