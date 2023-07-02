import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MagnifyingGlassIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  reset,
  searchMovie,
  setPage,
  showMoreMovie,
} from '../redux/features/searchSlice';
import {fallbackMoviePoster, image342} from '../api/moviedb';

const {width, height} = Dimensions.get('window');

const SearchScreenHome = () => {
  const dispatch = useAppDispatch();
  const {text, list, loading} = useAppSelector(store => store.search);

  const {goBack, navigate, push} = useNavigation<any>();

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

  const handleShowMore = () => {
    // dispatch(setPage());
    dispatch(showMoreMovie());
  };
  console.log(list[0]);
  return (
    <SafeAreaView className="flex-1 bg-myblue">
      <View className="relative">
        <TouchableOpacity
          className="ml-2"
          onPress={() => {
            goBack();
            dispatch(reset());
          }}>
          <ChevronLeftIcon size={'35'} color={'lightgray'} />
        </TouchableOpacity>
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
        {/* searched films */}
        <View className="mb-16">
          {/*  I didn't use "loading" state as a if statement, because when i press the 
          show more button then page scroll up to top because it refresh "loading" state
          and then component refresh itself again so i didn't use "loading" state here.*/}
          {list.length === 0 ? (
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
                className="m-auto mb-4"
                data={list}
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

export default SearchScreenHome;
