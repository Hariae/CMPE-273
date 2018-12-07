import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <ApolloProvider client={client}>
          <Main />
        </ApolloProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
