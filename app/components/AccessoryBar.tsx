import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default class AccessoryBar extends React.Component<any> {
  render() {
    const {onSend, isTyping} = this.props;

    return (
      <View style={styles.container}>
        <Button onPress={() => console.log('photo')} name="photo" />
        <Button onPress={() => console.log('camera')} name="camera" />
        <Button onPress={() => console.log('location')} name="my-location" />
        <Button
          onPress={() => {
            isTyping();
          }}
          name="chat"
        />
      </View>
    );
  }
}

const Button = ({
  onPress = () => {},
  size = 30,
  color = 'rgba(0,0,0,0.5)',
  name = '',
  ...props
}) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialIcons size={size} color={color} name={name} {...props} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.3)',
  },
});
