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
import {
  AuthContextData,
  DeviceInfo,
  User,
  // LoginResponseDto,
  RegisterFormInput,
} from '../types';
import {
  useSignupMutation,
  ErrorResponse,
  LoginResponseDto,
  useSignInMutation,
  useLogoutMutation,
} from '../redux/apis/AuthApi';
import {
  useUpdateOnboardingMutation,
  useUpdateOnboardingGenderMutation,
  useUpdateUserInterestedTagsMutation,
} from '../redux/apis/UserApi';

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
  const [signup, result] = useSignupMutation();
  const [signin, resultSignin] = useSignInMutation();
  const [logoutMutate, resultLogout] = useLogoutMutation();
  const [updateOnboardingMutate, resultUpdateOnboarding] =
    useUpdateOnboardingMutation();
  const [updateOnboardingGenderMutation, resultUpdateOnboardingGender] =
    useUpdateOnboardingGenderMutation();
  const [updateUserInterestedTagsMutation, resultUpdateUserInterestedTags] =
    useUpdateUserInterestedTagsMutation();
  const dispatch = useDispatch();
  const register = async ({
    name,
    email,
    password,
    username,
  }: RegisterFormInput) => {
    try {
      setLoading(true);

      const body = await signup({
        username,
        password,
        name,
        email,
        deviceId: deviceInfo.deviceId,
        platform: deviceInfo.Platform,
        manufacturer: deviceInfo.manufacturer,
      }).unwrap();

      console.log('body', body);
      setLoading(false);

      // not nessary to check body from rtk query because it will throw error if not success
      if (body.access_token) {
        setUser({
          // handle bad typing from backend , will fix in the future :)
          id: body.id,
          username: body.userId,
          at: body.access_token,
          rt: body.refresh_token,
          onboarding: false,
        });
        console.log('Register success w/ username: ' + body.userId);
        return {msg: true};
      }
      return {msg: false};
    } catch (e) {
      setLoading(false);
      let result = (e as ErrorResponse).data;
      if (result.error === 'Bad Request') {
        // if error is bad request messgae will be only array of string
        const b = result.message as string[];
        if (b.find((m: string) => m === 'email must be an email')) {
          return {
            msg: false,
            error: 'Email must be an email',
          };
        }
      }
      if (
        result.error === 'Forbidden' &&
        result.message === 'Credentials incorrect'
      ) {
        console.log('Credentials incorrect');
        return {msg: false, error: 'Credentials incorrect'};
      }
      return {msg: false, error: 'Something went wrong'};
    }
  };
  const login = async (username: string, password: string) => {
    try {
      setLoading(true);

      const body = await signin({
        username,
        password,
        deviceId: deviceInfo.deviceId,
        platform: deviceInfo.Platform,
        manufacturer: deviceInfo.manufacturer,
      }).unwrap();
      // console.log(body);
      // TODO : handle authentication login stuff.
      setLoading(false);

      if (body.access_token) {
        setUser({
          // handle bad typing from backend , will fix in the future :)
          id: body.id,
          username: body.userId,
          at: body.access_token,
          rt: body.refresh_token,
          onboarding: body.onboarding,
        });
        console.log('Login success w/ username: ' + body.userId);
        return true;
      }
      return false;
    } catch (e) {
      setLoading(false);
      let result = (e as ErrorResponse).data;
      if (result.error) {
        console.log('Invalid ID');
        // setUser({} as User);
        return false;
      }
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const body = await logoutMutate({at: user.at}).unwrap();

      // TODO : handle authentication logout stuff.
      setLoading(false);

      setUser({} as User);
    } catch (e) {
      setLoading(false);
      let result = (e as ErrorResponse).data;
      console.log('logout');
      console.log(e);

      if (result.message === 'Unauthorized') {
        // TODO : session timeout set user to {} and redirect to login page
        setUser({} as User);
        console.log('Session timeout');
        return;
      }
      // setUser({} as User);
    }
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
    const {username, at, rt, onboarding} = user;
    dispatch(userAction.mutate({username, at, rt, onboarding}));
  }, [user]);
  const updateUserInterestedTags = async (tags: string[]) => {
    // const response = await fetch('http://localhost:3333/user/update/tags', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${user.at}`,
    //   },
    //   body: JSON.stringify({
    //     userId: user.username,
    //     tags: tags,
    //   }),
    // });

    // const body = (await response.json()) as {result: boolean};
    const body = await updateUserInterestedTagsMutation({
      userId: user.username,
      tags: tags,
    }).unwrap();
    // if (body) {
    //   setUser({
    //     ...user,
    //     onboarding: body.result,
    //   });
    // }
  };
  const updateOnboarding = async (onboarding: boolean) => {
    try {
      setLoading(true);

      // const response = await fetch(
      //   'http://localhost:3333/user/update/onboarding',
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${user.at}`,
      //     },
      //     body: JSON.stringify({
      //       userId: user.username,
      //       onboarding: onboarding,
      //     }),
      //   },
      // );

      // const body = (await response.json()) as {result: boolean};
      const body = await updateOnboardingMutate({
        userId: user.username,
        onboarding: onboarding,
      }).unwrap();

      if (body) {
        setUser({
          ...user,
          onboarding: body.result,
        });
      }

      console.log('updateOnboarding', body);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log('updateOnboarding', e);
    }
  };
  const updateOnboardingGender = async (gender: string) => {
    // const response = await fetch(
    //   'http://localhost:3333/user/update/onboarding/gender',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${user.at}`,
    //     },
    //     body: JSON.stringify({
    //       userId: user.username,
    //       gender: gender,
    //     }),
    //   },
    // );
    // const body = (await response.json()) as {result: boolean};
    const body = await updateOnboardingGenderMutation({
      userId: user.username,
      gender: gender,
    });
    // if (body) {
    //   setUser({
    //     ...user,
    //     gender: body.result,
    //   });
    // }
    console.log('updateOnboarding', body);
  };

  useEffect(() => {
    userUpdateCallback();
    if (!isMount) {
      // console.log('onLoad Effect');
      // setLoading(true);

      if (userR.username) {
        const o = userR;
        const {username, at, rt, onboarding} = o;
        setUser({username, at, rt, onboarding} as User);
        console.log('Load user from redux');
      }
      getDeviceInfo().then(() => {
        setLoading(false);
      });
      // setLoading(false);
      setLoading(false);
      setIsMount(true);
    }
  }, [userUpdateCallback]);

  return {
    user,
    login,
    logout,
    loading,
    register,
    updateOnboarding,
    updateOnboardingGender,
    isMount,
    updateUserInterestedTags,
  };
};
