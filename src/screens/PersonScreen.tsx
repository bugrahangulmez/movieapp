import {
  SafeAreaView,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  fallbackPersonImage,
  fetchMoviePeopleWith,
  fetchPersonDetail,
  image500,
} from '../api/moviedb';
import {Loading, MovieList} from '../components';

const {width, height} = Dimensions.get('window');

const PersonScreen = () => {
  const {goBack, navigate} = useNavigation<any>();
  const [personDetail, setPersonDetail] = useState<PersonDetail>();
  const [acted, setActed] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const {params} = useRoute<any>();
  let item: PersonCast = params;
  useEffect(() => {
    (async () => {
      setLoading(true);
      const respDetail = await fetchPersonDetail(item.id.toString());
      const respActed: ApiResp = await fetchMoviePeopleWith(item.id.toString());

      setPersonDetail(respDetail);
      setActed(respActed.results);
      setLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-myblue">
      <ScrollView>
        {/* status bar and header */}
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
        {/* person detail */}
        {loading ? (
          <Loading />
        ) : (
          personDetail && (
            <>
              <View
                className="flex-row justify-center mt-[5vh]"
                style={{
                  shadowColor: 'gray',
                  shadowOpacity: 0.8,
                  shadowRadius: 100,
                }}>
                <View className="rounded-full overflow-hidden items-center h-[35vh] w-[35vh] border border-neutral-300">
                  <Image
                    source={{
                      uri:
                        image500(personDetail.profile_path) ||
                        fallbackPersonImage,
                    }}
                    style={{
                      width: width * 0.8,
                      height: height * 0.45,
                    }}
                  />
                </View>
              </View>
              <View className="flex-col justify-center items-center">
                <Text className="text-white text-center mt-[2vh] text-2xl font-semibold">
                  {personDetail.name}
                </Text>
                <Text className="text-white text-center text-xl font-extralight">
                  {personDetail.place_of_birth}
                </Text>
                <View className="flex-row item-center justify-evenly bg-slate-500 p-2 rounded-3xl">
                  <View className=" border-r border-neutral-700 px-2">
                    <Text className="text-white text-center">Gender</Text>
                    <Text className="text-white text-center">
                      {personDetail.gender === 1 ? 'Female' : 'Male'}
                    </Text>
                  </View>
                  <View className="border-r border-neutral-700 px-2">
                    <Text className="text-white text-center">Birthday</Text>
                    <Text className="text-white text-center">
                      {personDetail.birthday}
                    </Text>
                  </View>
                  <View className="border-r border-neutral-700 px-2">
                    <Text className="text-white text-center">Known for</Text>
                    <Text className="text-white text-center">
                      {personDetail.known_for_department}
                    </Text>
                  </View>
                  <View className="px-2">
                    <Text className="text-white text-center">Popularity</Text>
                    <Text className="text-white text-center">
                      {personDetail.popularity.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text className="text-white text-md font-serif p-4">
                    {personDetail.biography}
                  </Text>
                </View>
              </View>
              <MovieList buttonIsShown={false} title="Acted in" data={acted} />
            </>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonScreen;
