import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
    </ApolloProvider>
  );
}

export default App;
