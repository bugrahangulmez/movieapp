import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {
  image342,
  fetchMoviesWithGenres,
  fallbackMoviePoster,
} from '../api/moviedb';
import {Loading} from '../components';

const {width, height} = Dimensions.get('window');

const CategoryScreen = () => {
  const [totalResults, setTotalResults] = useState(0);
  const {goBack, navigate, push} = useNavigation<any>();
  const {params} = useRoute<any>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const category_id: number = params;
  const [movieList, setMovieList] = useState<Movie[]>([]);

  let state = {
    numColumns: 2,
  };
  useEffect(() => {
    // api call here
    (async () => {
      setLoading(true);
      const respList: ApiResp = await fetchMoviesWithGenres(
        category_id.toString(),
        page.toString(),
      );
      setMovieList(prevState => [...prevState, ...respList.results]);
      setTotalResults(respList.total_results);
      setPage(prevState => prevState + 1);
      setLoading(false);
    })();
  }, []);

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

  const handlePageIncrease = async () => {
    const respList: ApiResp = await fetchMoviesWithGenres(
      category_id.toString(),
      page.toString(),
    );
    setMovieList(prevState => [...prevState, ...respList.results]);
    setPage(prevState => prevState + 1);
  };

  return (
    <SafeAreaView className="flex-1 h-screen bg-myblue">
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <View className="flex-row justfy-start items-center relative">
            <TouchableOpacity
              className="absolute bottom-0"
              onPress={() => goBack()}>
              <ChevronLeftIcon size={'35'} color={'lightgray'} />
            </TouchableOpacity>
            <Text className="text-neutral-300 text-2xl font-semibold m-auto mt-4">
              <Text className="text-yellow-300">M</Text>
              ovie App
            </Text>
          </View>
          <View className="mb-16">
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={state.numColumns}
              className="m-auto mt-2 mb-16"
              data={movieList}
              renderItem={handleMovieList}
              keyExtractor={(item, index) =>
                state.numColumns.toString() + index.toString()
              }
            />
          </View>
          <View className="absolute bottom-4 w-screen flex justify-center items-center">
            <Text className="text-neutral-300 mx-6 my-2">
              {totalResults} films have found
            </Text>
            <TouchableOpacity
              onPress={handlePageIncrease}
              className="px-4 py-2 border border-neutral-300 rounded-full w-4/12 m-auto">
              <Text className="text-neutral-300 text-center">Show More</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CategoryScreen;
