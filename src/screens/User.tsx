import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
} from "native-base";
import React, { useEffect, useLayoutEffect } from "react";
import HeaderStat from "../components/HeaderStats";
import { Loader } from "../components/Loader";
import { useUserAndRepos } from "../hooks/reactQueryHooks";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RepoList } from "../components/RepoList";
import useAuthStore from "../stores/auth";
import useFavoritesStore from "../stores/favoritesStore";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

export type IUserProps = {
  route: { params: string };
};

const User: React.FC<IUserProps> = ({ route }) => {
  const userID = useAuthStore((state) => state.user?.uid);
  const navigation = useNavigation();
  const profile = route.params;
  const { addFavorite, deleteFavorite, favorites } = useFavoritesStore(
    (state) => ({
      addFavorite: state.addFavorite,
      deleteFavorite: state.deleteFavorite,
      favorites: state.favorites,
    })
  );

  const { status, data, refetch } = useUserAndRepos(profile);
  useEffect(() => {
    if (data?.user && favorites) {
      const userIsFavorited = favorites.find(
        (fav) => fav.login === data.user.login
      );
      navigation.setOptions({
        headerRight: () => {
          return (
            <Icon
              as={AntDesign}
              onPress={handleHeart}
              name={userIsFavorited ? "heart" : "hearto"}
              size={6}
              color="white"
            />
          );
        },
      });
    }
  }, [data, favorites]);

  if (status === "loading") {
    return <Loader />;
  }
  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = data?.user;
  const userIsFavorited = favorites.find((fav) => fav.login === login);
  console.log("IS FAVORITED?", userIsFavorited);
  function handleHeart() {
    if (userIsFavorited) {
      deleteFavorite(login);
    } else {
      addFavorite({ avatar_url, login, userID });
    }
  }

  const repos = data?.repos;

  // const userIsFavorited = favorites.includes(login);

  return (
    <Box bg="black" h={"100%"}>
      <ScrollView>
        <HStack alignItems={"center"}>
          <Image
            borderRadius={"full"}
            mt={4}
            mx={6}
            h={"20"}
            w={"20"}
            src={avatar_url}
            alt={`${name} avatar`}
          />

          <HeaderStat title={"Repos"} data={public_repos} />
          <HeaderStat title={"Followers"} data={followers} />
          <HeaderStat title={"Following"} data={following} />
        </HStack>
        <Box pt={2} px={6}>
          <Text fontSize={16} mb={0} color={"white"}>
            {name}
          </Text>
          {location && (
            <HStack alignItems={"center"}>
              <Icon name="location-pin" as={MaterialIcons} />
              <Text color={"white"}> {location}</Text>
            </HStack>
          )}
          <Text color={"white"}>{bio}</Text>
        </Box>
        <RepoList repos={repos} />
      </ScrollView>
    </Box>
  );
};

export { User };
