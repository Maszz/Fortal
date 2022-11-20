import {
  Box,
  View,
  Center,
  Text,
  Image,
  Button,
  HStack,
  Heading,
  Spinner,
  ZStack,
  Container,
  ScrollView,
  Flex,
  VStack,
  FlatList,
} from 'native-base';
import {FunctionComponent, useEffect} from 'react';
import {RegisterOnboardActivityProps} from '../types';
import {StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth} from '../hooks/useAuth';
import TagToggleButton from '../components/TagToggleButton';
import {useState} from 'react';
import {useGetTagsQuery} from '../redux/apis';
import LoadingScreen from './loadingScreen';
import {useDispatch} from 'react-redux';
import {setLoadingAction} from '../redux/reducers/navigation';
import {useTranslation} from 'react-i18next';
export interface Tags {
  [key: string]: boolean;
}
const RegisterOnboardActivity: FunctionComponent<
  RegisterOnboardActivityProps
> = ({navigation, route}) => {
  const {updateOnboarding, updateUserInterestedTags} = useAuth();
  const {t} = useTranslation();
  const [tags, setTags] = useState<Tags>({});
  const {data: tagsData, isSuccess, isLoading} = useGetTagsQuery();
  const dispatch = useDispatch();
  // const fetchTags = async () => {
  //   const response = await fetch('http://localhost:3333/tags');
  //   const data = await response.json();
  //   return data;
  // };

  useEffect(() => {
    // fetchTags().then((data: string[]) => {
    //   setTags(
    //     data.reduce((accumulator, value) => {
    //       return {...accumulator, [value]: false};
    //     }, {}),
    //   );
    // });
    dispatch(setLoadingAction(true));

    if (isSuccess) {
      dispatch(setLoadingAction(false));
      setTags(tagsData);
    }
  }, [isSuccess]);
  const renderTags = () => {
    const tagcount = Object.keys(tags).length;
    const rowItem = Math.ceil(tagcount / 3);
    let itemcount = 0;
    let offset = 0;
    const colors = [
      '#C4C2F3',
      '#C9B8DA',
      '#EDC4D6',
      '#FFDCE2',
      '#FFEAE5',
      // '#C4C2F3',
    ];
    const colorsIndex = Array.from({length: rowItem * 2}).fill('') as string[];
    let a = colorsIndex.map((color, i) => {
      return Math.floor((i * colors.length) / (rowItem * 2));
    });
    // console.log(a);
    const gradientcolors = a.map(i => colors[i]);
    // console.log(gradientcolors);
    const row1 = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      // if (i % 2 !== 0) {
      //   row.push(<Box w={6} />);
      // }
      let tempIndex = 0;

      for (let j = 0; j < rowItem; j++) {
        if (itemcount < tagcount) {
          const key = Object.keys(tags)[itemcount];
          // const color1 = colors[j % colors.length];
          // const color2 = colors[(j + 1) % colors.length];
          const color1 = gradientcolors[tempIndex];
          const color2 = gradientcolors[tempIndex + 1];

          tempIndex += 2;
          row.push(
            <TagToggleButton
              title={key}
              setTag={(value: boolean) => {
                setTags({...tags, [key]: value});
              }}
              gc={[color1, color2]}
              key={key}
            />,
          );
          itemcount++;
        }
      }

      row1.push(
        <Flex direction="row" mt={2}>
          {row}
        </Flex>,
      );

      offset++;
    }

    return <>{<VStack>{row1}</VStack>}</>;
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <Box
        style={{
          flex: 0.15,
          justifyContent: 'flex-end',
          marginLeft: 35,
        }}>
        <Button style={{width: 53, height: 50}} variant="ghost">
          <Image
            marginBottom={3}
            alt="key icon"
            source={require('../assets/back_icon.png')}
          />
        </Button>
      </Box> */}

      <Box
        style={{
          flex: 0.2,
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Text fontSize={20} color={'#232259'} fontWeight={'medium'}>
          {t('onboardingActivity:header')}
        </Text>
        <Text />
        <Text fontSize={16} color={'#232259'}>
          {t('onboardingActivity:description')}
        </Text>
      </Box>
      <Box style={{flex: 0.03}} />
      <Box style={{flex: 0.3, paddingTop: 25}}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          flex={1}>
          {renderTags()}
        </ScrollView>
      </Box>

      <Box
        style={{
          flex: 0.2,
          justifyContent: 'flex-end',
        }}>
        <Center style={{flexDirection: 'row'}}>
          <Box
            style={{
              width: 11,
              height: 11,
              backgroundColor: '#A8B0C5',
              borderRadius: 10,
              marginRight: 10,
            }}
          />
          <Box
            style={{
              width: 11,
              height: 11,
              backgroundColor: '#A55EDA',
              borderRadius: 10,
            }}
          />
        </Center>
      </Box>
      <Box flex={0.11} justifyContent={'flex-end'}>
        <TouchableOpacity
          style={{
            width: 250,
            height: 40,
            alignSelf: 'center',
          }}
          // width={'250px'}
          // height={'40px'}>
          onPress={async () => {
            await updateOnboarding(true);
            // console.log(Object.keys(tags).filter(key => tags[key]));
            await updateUserInterestedTags(
              Object.keys(tags).filter(key => tags[key]),
            );

            await navigation.navigate('HomeIndex');
          }}>
          <LinearGradient
            colors={['#3275F3', '#BD97FB', '#FFDFD8']}
            useAngle={true}
            angle={90}
            angleCenter={{x: 0.5, y: 0.5}}
            style={{
              flex: 1,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text color={'white'} bold fontSize={16}>
              Next
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Box>
    </View>
  );
};

export default RegisterOnboardActivity;
