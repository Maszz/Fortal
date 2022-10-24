import {View, Text, Button} from 'native-base';
import {useAuth} from '../hooks/useAuth';
const Home = () => {
  const {logout} = useAuth();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button onPress={() => logout()}>btn</Button>
    </View>
  );
};

export default Home;
