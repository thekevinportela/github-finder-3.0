import { State, create } from "zustand";
import {
  subscribeWithSelector,
  persist,
  createJSONStorage,
} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FavoriteItem } from "../types/types";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import useAuthStore from "./auth";
import { useEffect } from "react";

type UseFavoritesState = {
  favorites: FavoriteItem[];
  addFavorite: (favorite: FavoriteItem) => void;
  deleteFavorite: (id: string) => void;
  setFavorites: (favoritesFromFirebase: FavoriteItem[]) => void;
};

const useFavoritesStore = create<UseFavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      setFavorites: (favoritesFromFirebase) => {
        set({
          favorites: favoritesFromFirebase,
        });
      },
      addFavorite: (favorite) => {
        // firestore()
        //   .collection('favorites')
        //   .add({
        //     login: favorite.login,
        //     avatar_url: favorite.avatar_url,
        //     userID: favorite.userID,
        //   })
        //   .then(() => {
        //     console.log('Favorite added!');
        //   });
        firestore().doc(`favorites/${favorite.login}`).set({
          login: favorite.login,
          avatar_url: favorite.avatar_url,
          userID: favorite.userID,
        });
      },
      deleteFavorite: (login) => {
        firestore().collection("favorites").doc(login).delete();
        // .then(() => {
        //   console.log("Favorite Deleted");
        // });
      },
    }),
    {
      name: "favorites-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useFavoritesListener = () => {
  const userUID = useAuthStore((state) => state.user?.uid);
  const setFavorites = useFavoritesStore((state) => state.setFavorites);
  useEffect(() => {
    function onResult(
      QuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
    ) {
      const list: any[] = [];
      QuerySnapshot.forEach((doc) => {
        list.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setFavorites(list);
    }

    function onError(error: Error) {
      console.error(error);
    }

    const unsubscribe = firestore()
      .collection("favorites")
      .where("userID", "==", userUID)
      // .orderBy('postTime')
      .onSnapshot(onResult, onError);

    return unsubscribe;
  }, [userUID]);
};

export default useFavoritesStore;
