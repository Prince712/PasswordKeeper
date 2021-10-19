import React, {createContext, useState} from 'react';
import {View, Text} from 'react-native';
import { useToast } from 'native-base';
import auth from '@react-native-firebase/auth';
import { ShowToastError } from '../Components/ShowToast';
import firestore from '@react-native-firebase/firestore';


export const AuthContext = createContext();

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const Toast = useToast();

  const usersRef = firestore().collection('users');
  
  const defaultAvatar = 'https://coursebari.com/wp-content/uploads/2021/06/899048ab0cc455154006fdb9676964b3.jpg';

  const addUserToCollection =(email,password,firstName =null,lastName =null,avatar=defaultAvatar)=>{
          usersRef.add({
              firstName,
              lastName,
              email,
              password,
              avatar
          }).then(()=>{
            console.log("user Added successfully");
          })
          .catch( e => {
            console.log("error registering user:",e);
          })

  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            console.log('error in login : ', error);
            ShowToastError("Email or password is wrong!",Toast)
          }
        },
        register: async (email, password,firstName,lastName) => {
          try {
            auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                console.log('User account created & signed in!');
                // addUserToCollection(email,password,firstName,lastName);
                usersRef.doc(auth().currentUser.uid)
                .set({
                    firstName,
                    lastName,
                    email,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    avatar: null,
                })
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
