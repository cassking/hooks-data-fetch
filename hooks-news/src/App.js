import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {

  const [results, setResults]= useState([]);
  const [query, setQuery] = useState('cycling')

  // useEffect( () => {
  //   // how to get api data from external source, so side effect
  //   // promise based
  //   // p;
  //   axios.get('//hn.algolia.com/api/v1/search?query=cycling')
  //   .then( (response) => {
  //     console.log(response.data)
  //     setResults(response.data.hits)// never ending request useeffect loop
  //   })

  // }, []); //<----[]ensures that this only runs onComponentDidMount

  //using asyn
  useEffect( () => {
    getResultsCleanup()
    },
  [query]); //<----[]ensures that this only runs onComponentDidMount
    // and empty array ensures runs onComponentDidmount and unmount
    // but if we want this to update based on a certain value changing
    //im this case query we add query to array, pass as dependency
  const getResultsCleanup = async () => {
    //becasue async returns a promise
    // and useEffect must return a cleanup fctn or nothing
    const response = await axios.get(
      `//hn.algolia.com/api/v1/search?query=${query}`
      );// async returns a promise
    setResults(response.data.hits)
    }


  return(
    <React.Fragment>
    <input
      type="text"
      onChange={ (event) => setQuery(event.target.value)}
    />
    <ul>
      {results.map( (result => (
        <li key={result.objectID}><a href={result.url}>{result.title}</a></li>
      )))}
      </ul>
    </React.Fragment>
  )
}
