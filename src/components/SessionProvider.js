import React, { useState, useEffect, createContext, useContext } from 'react'
import { Context } from "@shopify/app-bridge-react";
import { getSessionToken } from '@shopify/app-bridge-utils';
import SessionTokenContext from '../contexts/SessionTokenContext'

export default function SessionProvider(props) {
  const [sessionToken, setSessionToken] = useState(false);
  const app = useContext(Context);

  useEffect(() => {
    if (app) {
      getSessionToken(app)
        .then((sessionToken) => {
          setSessionToken(sessionToken);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [app]);

  const loadingMarkup = props.renderLoading ? (
    props.renderLoading
  ) : (
    <>Loading...</>
  );

  return (
    <SessionTokenContext.Provider value={sessionToken}>
      {sessionToken && app ? props.children : loadingMarkup}
    </SessionTokenContext.Provider>
  );
}
