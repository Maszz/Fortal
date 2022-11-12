import {
  createBottomTabNavigator,
  BottomTabScreenProps,
  BottomTabBarButtonProps,
} from '@react-navigation/bottom-tabs';
import Home from './home';
import {HomeScreenTypes, HomeIndexScreenProps} from '../../types';
import {FunctionComponent, useLayoutEffect} from 'react';
import {View, Text, Button, Box, Image, HStack, Spacer} from 'native-base';
import Icon from '../../utils/ImageIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native';
import SearchScreen from './Search';
import ProfileScreen from './Profile';
import CreateScreen from './CreateEvent';
import FavoriteScreen from './Favorite';
import {useEffect} from 'react';
import {useAuth} from '../../hooks/useAuth';
import {Config} from '../../env';
import {useSelector, useDispatch} from 'react-redux';
import {store, RootState} from '../../redux';
import {useNavigation} from '@react-navigation/native';
import {setStackAction} from '../../redux/reducers/navigation';

const Tab = createBottomTabNavigator<HomeScreenTypes.TabScreenParams>();

const CreateTabbarButton: FunctionComponent<BottomTabBarButtonProps> = ({
  children,
  onPress,
}) => (
  <TouchableOpacity
    style={{
      top: -10,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const HomeIndex: FunctionComponent<HomeIndexScreenProps> = ({
  navigation,
  route,
}) => {
  const {user} = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.onboarding && Config.bypassRegister) {
      navigation.navigate('Onboard1');
    }
    if (Config.goOnboard) {
      navigation.navigate('Onboard1');
    }
    if (!user.onboarding) {
      navigation.navigate('Onboard1');
    }
    // set navigation object ref to navigation of stack
    dispatch(setStackAction({stackNavigation: navigation}));
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        lazy: true,

        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 75,
        },
        header: props => {
          return (
            <Box
              backgroundColor={'white'}
              safeAreaTop
              paddingBottom={3}
              shadow={1}>
              <HStack
                alignItems={'center'}
                w={'100%'}
                justifyContent={'space-between'}>
                <Image
                  source={Icon.homeScreen.logo}
                  h={41}
                  marginLeft={5}
                  alt={'fortal_logo'}
                />
                <Spacer />
                <TouchableOpacity>
                  <Ionicons
                    size={22}
                    name="notifications-outline"
                    color={'black'}
                    style={{marginRight: 10}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('FriendScreenIndex');
                  }}>
                  <Ionicons
                    size={22}
                    name="person"
                    color={'black'}
                    style={{marginRight: 10}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SettingScreen');
                  }}>
                  <Ionicons
                    size={22}
                    name="ios-settings-outline"
                    color={'black'}
                    style={{marginRight: 30}}
                  />
                </TouchableOpacity>
              </HStack>
            </Box>
          );
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              alignContent={'center'}
              justifyContent={'center'}
              top={3}
              //   style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            >
              <Image
                alt="home"
                source={Icon.tabNavigation.home}
                resizeMode="contain"
                width={25}
                height={25}
                tintColor={focused ? '#675BC6' : '#232259'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              alignContent={'center'}
              justifyContent={'center'}
              top={3}
              //   style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            >
              <Image
                alt="search"
                source={Icon.tabNavigation.search}
                resizeMode="contain"
                width={25}
                height={25}
                tintColor={focused ? '#675BC6' : '#232259'}
              />
            </View>
          ),
        }}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('SearchScreen');
          },
        })}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={Icon.tabNavigation.create}
              resizeMode="contain"
              width={80}
              height={80}
              alt="create"
            />
          ),
          tabBarButton: props => <CreateTabbarButton {...props} />,
        }}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('CreateModal');
          },
        })}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              alignContent={'center'}
              justifyContent={'center'}
              top={3}
              //   style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            >
              <Image
                alt="favorite"
                source={Icon.tabNavigation.favorite}
                resizeMode="contain"
                width={25}
                height={25}
                tintColor={focused ? '#675BC6' : '#232259'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('ProfileScreen');
          },
        })}
        options={{
          tabBarIcon: ({focused}) => (
            <View alignContent={'center'} justifyContent={'center'} top={3}>
              <Image
                alt="profile"
                source={Icon.tabNavigation.profile}
                resizeMode="contain"
                width={25}
                height={25}
                tintColor={focused ? '#675BC6' : '#232259'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeIndex;
