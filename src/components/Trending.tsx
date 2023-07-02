import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import {fallbackMoviePoster, image342, image500} from '../api/moviedb';

const {width, height} = Dimensions.get('window');

const Trending = ({trending}: {trending: Movie[]}) => {
  const {navigate} = useNavigation<any>();
  return (
    <View>
      <Carousel
        data={trending}
        sliderWidth={width}
        itemWidth={width * 0.7}
        firstItem={2}
        inactiveSlideOpacity={0.3}
        renderItem={({item, index}) => {
          return (
            <View>
              <TouchableWithoutFeedback onPress={() => navigate('Movie', item)}>
                <Image
                  source={{
                    uri: image500(item.poster_path) || fallbackMoviePoster,
                  }}
                  style={{
                    width: width * 0.7,
                    height: height * 0.5,
                    // resizeMode: 'contain',
                  }}
                  className="rounded-xl"
                />
              </TouchableWithoutFeedback>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Trending;
