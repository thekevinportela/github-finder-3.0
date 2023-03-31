import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { setFavoritesListener } from "./favoritesStore";

auth().onAuthStateChanged((user) => {
  useAuthStore.getState().checkAuth(user);
  // if (user) {
  //   setFavoritesListener(user.uid);
  // }
});

interface AuthState {
  isOnboarding: boolean | null;
  setOnboarding: (val: boolean) => void;
  isLoggedIn: boolean;
  user: FirebaseAuthTypes.User | undefined; // type this out correctly :)
  initializing: boolean;
  checkAuth: (user: FirebaseAuthTypes.User | null) => void;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: undefined,
        isLoggedIn: false,
        initializing: true,
        checkAuth: (user) => {
          console.log("USER", user);
          if (user) {
            set({
              user,
              isLoggedIn: true,
              initializing: false,
            });
          } else {
            set({
              isLoggedIn: false,
              initializing: false,
            });
          }
        },
        signup: (email, password) =>
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then((credentials) => {
              get().checkAuth(credentials.user);
              console.log("User account created & signed in!");
            })
            .catch((error) => {
              if (error.code === "auth/email-already-in-use") {
                console.log("That email address is already in use!");
              }

              if (error.code === "auth/invalid-email") {
                console.log("That email address is invalid!");
              }

              console.error(error);
            }),
        login: (email, password) =>
          auth()
            .signInWithEmailAndPassword(email, password)
            .then((credentials) => {
              set({
                isLoggedIn: true,
                user: credentials.user,
              });
            })
            .catch((error) => {
              console.log("ERROR: ", error);
            }),
        logout: () =>
          auth()
            .signOut()
            .then(() => {
              set({
                isLoggedIn: false,
                user: undefined,
              });
            }),
        isOnboarding: true,
        setOnboarding: (val) => set({ isOnboarding: val }),
      }),
      {
        name: "isOnboarding",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);

export default useAuthStore;
