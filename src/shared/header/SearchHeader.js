import React, {useState} from 'react';
import {View, TextInput, Pressable, StyleSheet} from 'react-native';

import {Colors} from '../../theme';
import {Searchbar} from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';

const SearchHeader = props => {
  const {searchContentByIdentifier} = props;
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    setSearchQuery(query);
    searchContentByIdentifier({s: query});
  };

  const onCleanSearch = () => {
    searchContentByIdentifier({s: ''});
  };
  return (
    <Searchbar
      style={styles.searchBox}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      onIconPress={onCleanSearch}
    />
  );
};

const styles = StyleSheet.create({
  searchBox: {
    // marginTop: 25,
    marginBottom: 15,
    width: '95%',
    paddingHorizontal: 0,
    borderRadius: 15,
  },
});

export default SearchHeader;
