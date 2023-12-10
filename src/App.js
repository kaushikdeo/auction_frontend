import './App.css';
import { ApolloProvider, useQuery} from '@apollo/client';
import {apolloClient} from './graphql/client'
import { GET_BOOKS } from './graphql/queries/booksQueries';

function App() {
  const { loading, error, data } = useQuery(GET_BOOKS, { errorPolicy: "all" });
  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <header className="App-header">
          <p>
            Hello World
          </p>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
