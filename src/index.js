import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  // uri: 'https://48p1r2roz4.sse.codesandbox.io',
  uri: 'http://localhost:4000/graphql',   // express-graphql localhost:4000
  cache: new InMemoryCache()
});

// client
//   .query({
//     query: gql`
//       query GetRates {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

// GetBooksはフロント側だけの名前
const FETCH_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
      price
    }
  }
`;

function FetchBooks() {
  const { loading, error, data } = useQuery(FETCH_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.books.map(course => (
    <div key={course.title}>
      <p>title: {`${course.title}`}</p>
      <p>author: {`${course.author}`}</p>
      <p>price: {`${course.price}`}</p>
      <hr />
    </div>
  ));
}


ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <ApolloProvider client={client}>
    <FetchBooks />
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// reportWebVitals(console.log)
