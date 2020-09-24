import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {

  const [results, setResults]= useState([]);

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
  []); //<----[]ensures that this only runs onComponentDidMount

  const getResultsCleanup = async () => {
    //becasue async returns a promise
    // and useEffect must return a cleanup fctn or nothing
    const response = await axios.get(
      '//hn.algolia.com/api/v1/search?query=cycling'
      );// async returns a promise
    setResults(response.data.hits)
    }


  return(
    <React.Fragment>
    <ul>
      {results.map( (result => (
        <li key={result.objectID}><a href={result.url}>{result.title}</a></li>
      )))}
      </ul>
    </React.Fragment>
  )
}
