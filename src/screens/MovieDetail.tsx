import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  fallbackMoviePoster,
  fallbackPersonImage,
  fetchCast,
  fetchMovieDetail,
  fetchSimilarMovies,
  image185,
  image342,
  image500,
} from '../api/moviedb';
import {Loading} from '../components';

const {width, height} = Dimensions.get('window');

const playerName = 'Player Name and Surname';
const filmName = 'Film Name Placeholder Takes Longer Than 20 Charachter';

const MovieDetail = () => {
  const [cast, setCast] = useState<PersonCast[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [detail, setDetail] = useState<MovieDetail>();
  const [loading, setLoading] = useState(false);

  const {params} = useRoute<any>();
  let item: Movie = params;
  useEffect(() => {
    (async () => {
      setLoading(true);
      const respDetail: MovieDetail = await fetchMovieDetail(
        item.id.toString(),
      );
      const respCast: CastResponse = await fetchCast(item.id.toString());

      const respSimilar: ApiResp = await fetchSimilarMovies(item.id.toString());
      setSimilarMovies(respSimilar.results);

      setDetail(respDetail);
      setCast(respCast.cast);
      setLoading(false);
    })();
  }, []);

  const {goBack, navigate, push} = useNavigation<any>();
  return (
    <SafeAreaView className="flex-1 bg-myblue">
      {loading ? (
        <Loading />
      ) : (
        detail && (
          <ScrollView>
            <StatusBar barStyle={'light-content'} />
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
            <View className="mt-4">
              <Image
                source={{
                  uri: image500(detail.poster_path) || fallbackMoviePoster,
                }}
                style={{width, height: height * 0.6}}
              />
              <LinearGradient
                colors={[
                  'transparent',
                  'rgba(18,19,30,0.5)',
                  'rgba(18,19,30,0.9)',
                  'rgba(18,19,30,1)',
                ]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={{width, height: height * 0.6}}
                className="absolute bottom-0"
              />
              <Text className="text-center text-neutral-300 text-3xl font-semibold">
                {detail.title}
              </Text>
            </View>
            <View className="p-4">
              <Text className="text-neutral-300">{detail.overview}</Text>
            </View>
            {/* cast */}
            <ScrollView
              className="mt-2 mx-2"
              horizontal
              showsHorizontalScrollIndicator={false}>
              {cast.map((item, index) => {
                return (
                  <View key={index} className="m-2">
                    <TouchableWithoutFeedback
                      onPress={() => push('Person', item)}>
                      <Image
                        className="rounded-full"
                        source={{
                          uri:
                            image185(item.profile_path) || fallbackPersonImage,
                        }}
                        style={{
                          width: width * 0.2,
                          height: width * 0.2,
                          borderWidth: 0.5,
                          borderColor: 'lightgray',
                          borderRadius: 50,
                        }}
                      />
                    </TouchableWithoutFeedback>
                    <Text className="text-white mt-2">
                      {item.name.length > 10
                        ? item.name.slice(0, 10) + '...'
                        : item.name}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
            {/* similar movies */}
            <Text className="text-neutral-300 text-xl font-semibold m-4">
              Similar Movies
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {similarMovies.map((item, index) => {
                return (
                  <View key={index} className="m-3">
                    <TouchableWithoutFeedback
                      onPress={() => push('Movie', item)}>
                      <Image
                        source={{
                          uri:
                            image342(item.poster_path) || fallbackMoviePoster,
                        }}
                        style={{
                          width: width * 0.44,
                          height: height * 0.3,
                          borderRadius: 15,
                        }}
                      />
                    </TouchableWithoutFeedback>
                    <Text className="text-white mt-2">
                      {item.title.length > 23
                        ? item.title.slice(0, 23) + '...'
                        : item.title}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </ScrollView>
        )
      )}
    </SafeAreaView>
  );
};

export default MovieDetail;
