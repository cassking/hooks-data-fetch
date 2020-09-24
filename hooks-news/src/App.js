import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function App() {

  const [results, setResults]= useState([]);
  const [query, setQuery] = useState('cycling');
  const[loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const searchInputRef = useRef() // no need to pass anything to useRef
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
  // useEffect( () => {
  //   getResultsCleanup()
  //   },
  // [query]); //<----[]ensures that this only runs onComponentDidMount
    // and empty array ensures runs onComponentDidmount and unmount
    // but if we want this to update based on a certain value changing
    //im this case query we add query to array, pass as dependency
    //ALTERNATIVE
    // instaed of dependency in array
    // add button so user can choose when to update page
    // so getResultsCleanup does not get run every time
    useEffect( () => {
      getResultsCleanup()
      },
    []);
  const getResultsCleanup = async () => {
    setLoading(true)
    try {
//becasue async returns a promise
    // and useEffect must return a cleanup fctn or nothing
    const response = await axios.get(
      `//hn.algolia.com/api/v1/search?query=${query}`
      );// async returns a promise
    setResults(response.data.hits);
    } catch (err) {
      setError(err)
    }
    setLoading(false);

    }
 const handleSearch = (event) => {
   event.preventDefault();
   getResultsCleanup()
 }
 const handleClearSearch = () => {
  setQuery("")
  searchInputRef.current.focus()
 }

  return(
    <div className="container bg-purple-lightest max-w-md mx-auto p-4 m-2 shadow-lg rounded">
    <h1 className="text-grey-darkest font-thin">News Aggregator</h1>
    <form
      className="mb-2"
      onSubmit={handleSearch}>
    <input
      type="text"
      onChange={ (event) => setQuery(event.target.value)}
      value={query}
      ref={searchInputRef}
      className="border p-1 rounded"
    />
    <button
      className="bg-orange rounded m-1 p-1"
      type="submit">Search
      </button>
      <button
      className="bg-teal text-white p-1 rounded"
      type="button"
      onClick={handleClearSearch}>Clear search
      </button>
    </form>
    {loading ? (
      <div>Loading results...</div>
    ) : (
    <ul>
      {results.map( (result => (
        <li key={result.objectID}><a href={result.url}>{result.title}</a></li>
      )))}
      </ul>)
    }
    {error && <div>{error.message}</div>}
    </div>
  )
}
