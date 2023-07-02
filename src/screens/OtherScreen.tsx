import {
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Loading, MovieList} from '../components';
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../api/moviedb';

const {width, height} = Dimensions.get('window');

const movieName = 'Film Name Place Holder Takes Longer Than 14 Charachters';

const OtherScreen = () => {
  const [loading, setLoading] = useState(false);

  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const respUpcoming: ApiResp = await fetchUpcomingMovies();
      const dataUpcoming = respUpcoming.results;
      const respTopRated: ApiResp = await fetchTopRatedMovies();
      const dataTopRated = respTopRated.results;
      const respNowPlaying: ApiResp = await fetchNowPlayingMovies();
      const dataNowPlaying = respNowPlaying.results;
      const respPopular: ApiResp = await fetchPopularMovies();
      const dataPopular = respPopular.results;

      setUpcoming(dataUpcoming);
      setTopRated(dataTopRated);
      setNowPlaying(dataNowPlaying);
      setPopular(dataPopular);

      setLoading(false);
    })();
  }, []);

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

        {/* upcoming movies */}
        {loading ? <Loading /> : <MovieList title="Upcoming" data={upcoming} />}
        {/* top rated movies */}
        {loading ? (
          <Loading />
        ) : (
          <MovieList title="Top Rated" data={topRated} />
        )}
        {/* now playing */}
        {loading ? (
          <Loading />
        ) : (
          <MovieList title="Now Playing" data={nowPlaying} />
        )}
        {/* popular */}
        {loading ? <Loading /> : <MovieList title="Popular" data={popular} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtherScreen;
