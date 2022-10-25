import React, {
  createContext,
  useEffect,
  useCallback,
  useState,
  FunctionComponent,
  useContext,
} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {store, RootState, userAction} from '../redux';
import {getUniqueId, getManufacturer} from 'react-native-device-info';
import {Platform} from 'react-native';
import {Message} from '../graphql/graphql';
import {AuthContextData, DeviceInfo, User, LoginResponseDto} from '../types';
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);
export const AuthProvider: FunctionComponent<{children?: JSX.Element}> = ({
  children,
}) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
const useAuth = () => {
  // user state send the pure state to the component , not include persist state
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({} as DeviceInfo);
  const [user, setUser] = useState<User>({} as User);
  const userR = useSelector<RootState, RootState['user']>(state => state.user);
  const [loading, setLoading] = useState(true);
  const [isMount, setIsMount] = useState(false);
  const dispatch = useDispatch();
  const login = async (username: string, password: string) => {
    setLoading(true);
    const response = await fetch('http://localhost:3333/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        deviceId: deviceInfo.deviceId,
        platform: deviceInfo.Platform,
        manufacturer: deviceInfo.manufacturer,
      }),
    });
    const body = (await response.json()) as LoginResponseDto;
    // console.log(body);
    // TODO : handle authentication login stuff.
    if (body.error) {
      console.log('Invalid ID');
      // setUser({} as User);
      return false;
    }
    if (body.access_token) {
      setUser({
        // handle bad typing from backend , will fix in the future :)
        username: body.userId as string,
        at: body.access_token as string,
        rt: body.refresh_token as string,
      });
      console.log('Login success w/ username: ' + body.userId);
      return true;
    }
    return false;
  };

  const logout = async () => {
    const response = await fetch('http://localhost:3333/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.at}`,
      },
    });
    const body = await response.json();
    // TODO : handle authentication logout stuff.
    if (body.status === 'error') {
      // TODO : session timeout set user to {} and redirect to login page
      setUser({} as User);
      console.log('Session timeout');
      return;
    }
    if (body == 'OK') {
      setUser({} as User);
      console.log('Logout success');
      return;
    }
    setUser({} as User);
  };
  const getDeviceInfo = async () => {
    const uid = await getUniqueId();
    const platform = Platform.OS;
    // console.log('Platform: ' + platform);
    const manufacturer = await getManufacturer();
    setDeviceInfo({
      deviceId: uid,
      Platform: platform,
      manufacturer: manufacturer,
    });
  };

  const userUpdateCallback = useCallback(() => {
    console.log('userUpdateCallback');
    const {username, at, rt} = user;
    dispatch(userAction.mutate({username, at, rt}));
  }, [user]);

  useEffect(() => {
    userUpdateCallback();
    if (!isMount) {
      setIsMount(true);
      console.log('onLoad Effect');

      if (userR.username) {
        const o = userR;
        const {username, at, rt} = o;
        setUser({username, at, rt} as User);
        console.log('Load user from redux');
      }
      getDeviceInfo().then(() => {
        setLoading(false);
      });
    }
  }, [userUpdateCallback]);

  return {
    user,
    login,
    logout,
    loading,
  };
};
