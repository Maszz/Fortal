import {FunctionComponent} from 'react';
import {View, Text} from 'native-base';
import {HomeScreenTypes} from '../../types';
/**
 *
 * @returns This is dummy Components
 */
const CreateScreen: FunctionComponent<
  HomeScreenTypes.CreateScreenProps
> = () => {
  return (
    <View>
      <Text>Create Screen</Text>
    </View>
  );
};
export default CreateScreen;
