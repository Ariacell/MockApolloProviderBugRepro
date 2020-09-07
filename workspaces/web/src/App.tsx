import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getApolloClient } from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import ApolloComponent from './ApolloComponent';

const App = () => {

  const [completionCount, setCompletionCount] = useState(0);


  const client = getApolloClient();
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <ApolloComponent counter={{ count: completionCount, setCount: setCompletionCount }}/>
        </header>
      </ApolloProvider>
    </div>
  );
}

export default App;
