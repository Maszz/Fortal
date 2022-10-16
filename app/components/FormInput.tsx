import {View, Text, Input, Image} from 'native-base';
import {FunctionComponent} from 'react';
import {FormInputProps} from '../types';

const FormInput: FunctionComponent<FormInputProps> = ({
  title,
  icon,
  placeholder,
}) => {
  return (
    <View
      style={{
        borderBottomColor: '#8172F7',
        borderBottomWidth: 2,
        marginTop: 10,
      }}>
      <Text color={'#232259'}>{title}</Text>
      <Input
        InputLeftElement={<Image alt="key icon" source={icon} />}
        variant="underlined"
        placeholder={placeholder}
        paddingLeft={3}
      />
    </View>
  );
};
export default FormInput;
