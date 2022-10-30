import {View, Text, Button} from 'native-base';
import {useAuth} from '../../hooks/useAuth';
import {HomeScreenProps} from '../../types';
import {FunctionComponent} from 'react';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Config} from '../../env';
import {useSelector, useDispatch} from 'react-redux';
import {store, RootState} from '../../redux';
const Home: FunctionComponent<HomeScreenProps> = ({route}) => {
  const {logout, user} = useAuth();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button onPress={() => logout()}>btn</Button>
    </View>
  );
};

export default Home;
