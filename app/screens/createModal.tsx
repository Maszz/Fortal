import {View, Text, Button} from 'native-base';

import {FunctionComponent} from 'react';
import {CreateModalProps} from '../types';
const Home: FunctionComponent<CreateModalProps> = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
};

export default Home;
