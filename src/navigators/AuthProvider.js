import React, {createContext, useState} from 'react';
import {View, Text} from 'react-native';
import { useToast } from 'native-base';
import auth from '@react-native-firebase/auth';
import { ShowToastError } from '../Components/ShowToast';


export const AuthContext = createContext();

export default function AuthProvider({children}) {
  const [user, setuser] = useState(null);
  const Toast = useToast();

  return (
    <AuthContext.Provider
      value={{
        user,
        setuser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            console.log('error in login : ', error);
            ShowToastError("Email or password is wrong!",Toast)
          }
        },
        register: async (email, password) => {
          try {
            auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                console.log('User account created & signed in!');
              })
              .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                  console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                  console.log('That email address is invalid!');
                }

                console.error(error);
              });
          } catch (e) {
            console.log('error in registeration : ', e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            console.log('error in logout : ', error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
}
