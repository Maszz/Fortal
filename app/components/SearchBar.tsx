import {onFocus} from '@reduxjs/toolkit/dist/query/core/setupListeners';
import {Text, View, Heading, Input} from 'native-base';
import {
  FunctionComponent,
  useEffect,
  useState,
  useCallback,
  useRef,
  MutableRefObject,
  forwardRef,
  RefObject,
  createRef,
} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useGetSearchItemQuery} from '../redux/apis/SearchApi';
export interface SearchBarProps {
  onSearchSubmit: (term: string) => void;
  clearResults: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
  getRef?: RefObject<any>;
  onFocus?: () => void;
  onBlur?: () => void;
}
const SaerchBar: FunctionComponent<SearchBarProps> = ({
  onSearchSubmit,
  clearResults,
  style,
  getRef,
  onFocus,
  onBlur,
}) => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTerm(debouncedTerm), 500);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);
  useEffect(() => {
    if (term !== '') {
      onSearchSubmit(term);
      clearResults(false);
    } else {
      clearResults(true);
    }
  }, [term]);

  return (
    <View style={style}>
      <Input
        ref={getRef}
        variant="rounded"
        value={debouncedTerm}
        InputLeftElement={
          <Icon
            name="search1"
            size={18}
            color={'#8B9093'}
            style={{marginLeft: 10}}
          />
        }
        placeholder="hash tag, location, people etc."
        bgColor={'#D9D9D9'}
        onChangeText={e => setDebouncedTerm(e)}
        onFocus={() => {
          if (debouncedTerm === '') {
            clearResults(true);
          } else {
            clearResults(false);
          }
          if (onFocus) {
            onFocus();
          }
        }}
        onBlur={e => {
          clearResults(true);
          // delay onBlur to invoke to prevent screen shift
          if (onBlur) {
            setTimeout(() => {
              onBlur();
            }, 100);
          }
        }}
      />
    </View>
  );
};

export default SaerchBar;
