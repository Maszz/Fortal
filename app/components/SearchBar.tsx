import {Text, View, Heading, Input} from 'native-base';
import {FunctionComponent, useEffect, useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useGetSearchItemQuery} from '../redux/apis/SearchApi';
export interface SearchBarProps {
  onSearchSubmit: (term: string) => void;
  clearResults: (value: boolean) => void;
}
const SaerchBar: FunctionComponent<SearchBarProps> = ({
  onSearchSubmit,
  clearResults,
}) => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
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
    <View>
      <Input
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
      />
    </View>
  );
};
export default SaerchBar;
