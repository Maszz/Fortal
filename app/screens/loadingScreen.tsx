import {Box, Text, HStack, Spinner, Heading, View} from 'native-base';
const LoadingScreen = () => {
  return (
    <View
      backgroundColor={'black'}
      opacity={25}
      top={0}
      left={0}
      right={0}
      bottom={0}
      position={'absolute'}
      justifyContent={'center'}
      alignItems="center"
      zIndex={10}>
      <HStack space={2}>
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    </View>
  );
};

export default LoadingScreen;
{
  true ? (
    <View
      backgroundColor={'black'}
      opacity={25}
      top={0}
      left={0}
      right={0}
      bottom={0}
      position={'absolute'}
      justifyContent={'center'}
      alignItems="center"
      zIndex={10}>
      <HStack space={2}>
        <Spinner accessibilityLabel="Loading posts" />
        <Text color="primary.500" fontSize="md">
          Loading
        </Text>
      </HStack>
    </View>
  ) : null;
}
