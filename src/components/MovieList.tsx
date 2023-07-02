import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {fallbackMoviePoster, image342} from '../api/moviedb';
const {width, height} = Dimensions.get('window');

const MovieList = ({
  data,
  title,
  buttonIsShown = true,
}: {
  data: Movie[];
  title: string;
  buttonIsShown?: boolean;
}) => {
  const {navigate, push} = useNavigation<any>();
  return (
    <View>
      <View className="flex-row justify-between mx-4">
        <Text className="my-4 text-neutral-300 text-xl font-semibold">
          {title}
        </Text>
        {buttonIsShown && (
          <TouchableOpacity onPress={() => navigate('All', title)}>
            <Text className="text-yellow-300 text-xl font-semibold my-4">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        className="mx-4"
        horizontal
        showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => {
          return (
            <View key={index}>
              <TouchableWithoutFeedback onPress={() => push('Movie', item)}>
                <Image
                  className="mr-6"
                  source={{
                    uri: image342(item.poster_path) || fallbackMoviePoster,
                  }}
                  style={{
                    width: width * 0.35,
                    height: height * 0.3,
                    borderRadius: 10,
                  }}
                />
              </TouchableWithoutFeedback>
              <Text className="text-neutral-300 mt-2">
                {item.title.length > 17
                  ? item.title.slice(0, 17) + '...'
                  : item.title}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
