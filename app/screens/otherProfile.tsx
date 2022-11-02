import {View, Text} from 'native-base';
import {OtherProfileScreenProps} from '../types';
import {FunctionComponent} from 'react';
import {TabRouter} from '@react-navigation/native';
const OtherProfileScreen: FunctionComponent<OtherProfileScreenProps> = ({
  route,
  navigation,
}) => {
  //   if (loading) return <Loading />;
  //   if (error) return <Error />;

  return (
    <View>
      <Text>{route.params.userId}</Text>
    </View>
  );
};

export default OtherProfileScreen;
