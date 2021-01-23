import React, { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import firebase from './firebase';
import cookie from 'js-cookie';
import { createUser } from './db';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);

      cookie.set('ifeedback-auth', true, {
        expires: 1
      });
      Router.push('/dashboard');

      return user;
    } else {
      setUser(false);
      cookie.remove('ifeedback-auth');
      Router.push('/');
      return false;
    }
  };

  const signinWithGitHub = async () => {
    const response = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider());
    return handleUser(response.user);
  };

  const signinWithGoogle = async () => {
    const response = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return handleUser(response.user);
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
    return () => unsubscribe();
  }, []);

  const formatUser = (rawUser) => {
    return {
      uid: rawUser.uid,
      email: rawUser.email,
      name: rawUser.displayName,
      token: rawUser.ya,
      provider: rawUser.providerData[0].providerId,
      photoUrl: rawUser.photoURL
    };
  };

  return {
    user,
    signinWithGitHub,
    signinWithGoogle,
    signout
  };
}
