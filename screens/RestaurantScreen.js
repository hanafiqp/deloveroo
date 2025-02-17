import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {urlFor} from '../sanity';
import {
  ArrowLeftIcon,
  LocationMarkerIcon,
  QuestionMarkCircleIcon,
} from 'react-native-heroicons/outline';
import {ChevronRightIcon, StarIcon} from 'react-native-heroicons/solid';

import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import {useDispatch} from 'react-redux';
import {setRestaurant} from '../features/restaurantSlice';

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <>
      <StatusBar animated="fade" hidden />
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className={`absolute left-5 p-2 bg-gray-100 rounded-full ${
              Platform.OS === 'ios' ? 'top-12' : 'top-5'
            }`}>
            <ArrowLeftIcon size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-gray-500">{rating}</Text> · {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-gray-500">Nearby · {address}</Text>
                </Text>
              </View>
            </View>

            <Text className="text-xs text-gray-500 pb-4">
              {short_description}
            </Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food allergy ?
            </Text>
            <ChevronRightIcon color="#00ccbb" />
          </TouchableOpacity>
        </View>

        <View className="bg-white pb-36">
          <Text className="font-bold px-4 pt-6 mb-3 text-xl">Menu</Text>

          {dishes.map(
            (
              dish, //dishes is an array of objects
            ) => (
              <DishRow
                key={dish._id}
                id={dish._id}
                image={dish.image}
                name={dish.name}
                price={dish.price}
                description={dish.short_description}
              />
            ),
          )}
        </View>
      </ScrollView>

      <BasketIcon />
    </>
  );
};

export default RestaurantScreen;
