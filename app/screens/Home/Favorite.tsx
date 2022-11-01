import {FunctionComponent} from 'react';
import {View, Text} from 'native-base';
import {HomeScreenTypes} from '../../types';
const FavoriteScreen: FunctionComponent<
  HomeScreenTypes.FavoriteScreenProps
> = () => {
  return (
    <View>
      <Text>Favorite Screen</Text>
    </View>
  );
};
export default FavoriteScreen;
