import {
  View,
  Text,
  Input,
  Image,
  FormControl,
  WarningOutlineIcon,
} from 'native-base';
import {FunctionComponent} from 'react';
import {FormInputProps} from '../types';

const FormInput: FunctionComponent<FormInputProps> = ({
  title,
  icon,
  placeholder,
  onChangeText,
  value,
  isInvalid,
  invalidMessage,
  type = 'text',
}) => {
  return (
    <View
      style={{
        marginTop: 10,
      }}>
      <FormControl isInvalid={isInvalid}>
        <Text color={'#232259'}>{title}</Text>
        <Input
          InputLeftElement={<Image alt="key icon" source={icon} />}
          variant="unstyled"
          placeholder={placeholder}
          // paddingLeft={3}
          onChangeText={text => {
            onChangeText(text);
          }}
          value={value}
          type={type}
          borderBottomColor={'#8172F7'}
          borderBottomWidth={2}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {invalidMessage}
        </FormControl.ErrorMessage>
      </FormControl>
    </View>
  );
};
export default FormInput;
