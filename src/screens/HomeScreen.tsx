import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MagnifyingGlassIcon} from 'react-native-heroicons/solid';
import {Loading, Trending} from '../components';
import {useNavigation} from '@react-navigation/native';
import {fetchTrendingMovies} from '../api/moviedb';
import {useAppDispatch} from '../redux/hooks';
import {searchMovie, setText} from '../redux/features/searchSlice';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const [searchedText, setSearchedText] = useState('');

  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState<Movie[]>([]);
  const {navigate, push} = useNavigation<any>();

  const handleSearchMovie = (val: string) => {
    setSearchedText(val);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resp: ApiResp = await fetchTrendingMovies();
      const data = resp.results;
      setTrending(data);
      setLoading(false);
    })();
  }, []);

  const handlePressSearch = () => {
    dispatch(setText(searchedText));
    dispatch(searchMovie(searchedText));
    push('Search');
    setSearchedText('');
  };
  useEffect(() => {}, [searchedText]);
  return (
    <SafeAreaView className="flex-1 bg-myblue">
      <ScrollView>
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
        {/* header */}
        <SafeAreaView>
          <Text className="text-neutral-100 text-2xl font-semibold text-start mt-10 mb-4 mx-12">
            Hello <Text className=" font-thin">Dear Guest</Text>
          </Text>
        </SafeAreaView>
        <View className="flex-row justify-start items-center bg-secondary w-8/12 rounded-2xl px-2 mx-auto mb-8 mt-2">
          <TouchableOpacity onPress={handlePressSearch}>
            <MagnifyingGlassIcon size={'25'} color={'lightgray'} />
          </TouchableOpacity>
          <TextInput
            value={searchedText}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            className="p-2 bg-transparent rounded-2xl px-2 py-4"
            placeholder="Search Movie"
            placeholderTextColor={'lightgray'}
            style={{color: 'lightgray'}}
            onChangeText={handleSearchMovie}
          />
        </View>
        {/* featured movies */}
        {loading ? <Loading /> : <Trending trending={trending} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
