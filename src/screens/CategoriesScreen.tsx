import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchGenres} from '../api/moviedb';
import {useNavigation} from '@react-navigation/native';

const CategoriesScreen = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  const {push} = useNavigation<any>();

  useEffect(() => {
    (async () => {
      const respGenres: {genres: Genre[]} = await fetchGenres();
      setGenres(respGenres.genres);
    })();
  }, []);

  let state = {
    numColumns: 2,
  };

  return (
    <SafeAreaView className="flex-1 bg-myblue">
      <FlatList
        className="m-auto"
        data={genres}
        numColumns={state.numColumns}
        keyExtractor={(item, index) =>
          state.numColumns.toString() + index.toString()
        }
        renderItem={({item}) => {
          return (
            <View className="w-[44vw] my-4 mx-2 rounded-xl flex justify-center items-center border border-neutral-100">
              <TouchableWithoutFeedback
                onPress={() => push('Category', item.id)}>
                <Text className="text-neutral-100 text-xl my-2 font-medium text-center">
                  {item.name}
                </Text>
              </TouchableWithoutFeedback>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default CategoriesScreen;
