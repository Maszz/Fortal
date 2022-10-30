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
} from 'native-base';
import {FunctionComponent, useEffect} from 'react';
import {RegisterOnboardActivityProps} from '../types';
import {StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth} from '../hooks/useAuth';
import TagToggleButton from '../components/TagToggleButton';
import {useState} from 'react';

export interface Tags {
  [key: string]: boolean;
}
const RegisterOnboardActivity: FunctionComponent<
  RegisterOnboardActivityProps
> = ({navigation, route}) => {
  const {updateOnboarding} = useAuth();
  const [tags, setTags] = useState<Tags>({
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
  });
  const tagfromapi = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  useEffect(() => {
    console.log(tags);
  }, [tags]);
  useEffect(() => {
    tagfromapi.forEach(tag => {});
    console.log(
      tagfromapi.reduce((accumulator, value) => {
        return {...accumulator, [value]: false};
      }, {}),
    );
  }, []);
  return (
    <View style={{flex: 1}}>
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
          flex: 0.15,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Text fontSize={20} color={'#232259'} fontWeight={'medium'}>
          Pick your prefer activity you like
        </Text>
        <Text />
        <Text fontSize={16} color={'#232259'}>
          Tap once on your favorite genres
        </Text>
      </Box>
      <Box style={{flex: 0.08}} />
      <Container>
        <TouchableHighlight
          style={{height: 45, borderRadius: 35}}
          onPress={() => {
            console.log('Pressable');
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
              borderRadius: 35,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text color={'white'} bold fontSize={16}>
              test button
            </Text>
          </LinearGradient>
        </TouchableHighlight>
      </Container>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Flex direction="row">
          {Object.entries(tags).map(([key, value]) => (
            <TagToggleButton
              title={key}
              setTag={v => {
                setTags({...tags, key: v});
              }}
              key={key}
            />
          ))}
        </Flex>
      </ScrollView>

      <TagToggleButton title={'test'} setTag={v => {}} />
      <TouchableOpacity
        style={{width: 250, height: 40}}
        // width={'250px'}
        // height={'40px'}>
        onPress={async () => {
          await updateOnboarding(true);
          navigation.navigate('HomeIndex');
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
    </View>
  );
};

export default RegisterOnboardActivity;
