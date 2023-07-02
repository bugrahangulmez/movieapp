import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {MagnifyingGlassIcon} from 'react-native-heroicons/solid';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fallbackMoviePoster, image342, searchMovie} from '../api/moviedb';
import {debounce} from 'lodash';

const {width, height} = Dimensions.get('window');

const SearchScreen = () => {
  const {goBack, navigate, push} = useNavigation<any>();
  const filmName = 'Film Name Placeholder Takes Longer Than 20 Charachter';

  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [text, setText] = useState('');
  let state = {
    numColumns: 2,
  };

  const handleMovieList = ({item}: {item: Movie}) => {
    return (
      <View className="m-3">
        <TouchableWithoutFeedback onPress={() => push('Movie', item)}>
          <Image
            source={{uri: image342(item.poster_path) || fallbackMoviePoster}}
            style={{
              width: width * 0.4,
              height: height * 0.3,
              borderRadius: 10,
            }}
          />
        </TouchableWithoutFeedback>
        <Text className="text-neutral-300">
          {item.title.length > 20
            ? item.title.slice(0, 20) + '...'
            : item.title}
        </Text>
      </View>
    );
  };

  const handleShowMore = async () => {
    const respSearched: ApiResp = await searchMovie(text, page.toString());
    setMovieList(prevState => [...prevState, ...respSearched.results]);
    setPage(prevState => prevState + 1);
  };

  const handleSearch = async (value: string | number) => {
    if (typeof value === 'number') {
      setText(value.toString());
      let results: ApiResp = await searchMovie(value.toString());
      setMovieList(results.results);
      setPage(prevState => prevState + 1);
    } else {
      setText(value);
      let results: ApiResp = await searchMovie(value);
      setMovieList(results.results);
      setPage(prevState => prevState + 1);
    }
  };

  const handleSearchBounce = useCallback(debounce(handleSearch, 500), []);

  return (
    <SafeAreaView className="flex-1 bg-myblue">
      <View className="relative">
        <StatusBar barStyle={'light-content'} />
        {/* background design items */}
        <>
          <View
            className="absolute w-32 h-32 bg-white rounded-full"
            style={{
              left: Dimensions.get('window').width * -0.6,
              top: Dimensions.get('window').height * 0.12,
              shadowColor: 'white',
              shadowOffset: {width: width * 0.7, height: height * 0.01},
              shadowOpacity: 0.3,
              shadowRadius: 80,
            }}></View>
          <View
            className="absolute w-32 h-32 bg-white rounded-full"
            style={{
              shadowColor: 'white',
              shadowOffset: {width: width * -0.7, height: height * 0.01},
              shadowOpacity: 0.3,
              shadowRadius: 80,
              top: height * 0.47,
              right: width * -0.7,
            }}></View>
        </>
        {/* searchbar items */}
        <View className="flex-row justify-start items-center bg-secondary w-10/12 rounded-2xl px-2 mx-auto mb-4 mt-2">
          <MagnifyingGlassIcon size={'25'} color={'lightgray'} />
          <TextInput
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            className="p-2 bg-transparent w-11/12 rounded-2xl px-2 py-4"
            placeholder="Search Movie"
            placeholderTextColor={'lightgray'}
            style={{color: 'lightgray'}}
            onChangeText={handleSearchBounce}
          />
        </View>
        {/* searched films */}
        <View className="mb-16">
          {movieList.length === 0 ? (
            <Image
              source={require('../assets/images/movieTime.png')}
              style={{width, height: height * 0.7, resizeMode: 'contain'}}
            />
          ) : (
            <>
              <View className="w-screen mb-4">
                <TouchableOpacity
                  onPress={handleShowMore}
                  className="px-4 py-2 border border-neutral-300 rounded-full w-4/12 m-auto">
                  <Text className="text-neutral-300 text-center">
                    Show More
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={state.numColumns}
                className="m-auto mb-24"
                data={movieList}
                renderItem={handleMovieList}
                keyExtractor={(item, index) =>
                  state.numColumns.toString() + index.toString()
                }
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
