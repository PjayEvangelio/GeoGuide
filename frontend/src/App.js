import React, { useState, useEffect } from "react";
import axios from "axios";                                  // Import Axios for making HTTP requests to fetch country data
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);           // To store country data
  const [searchTerm, setSearchTerm] = useState("");         // For storing search input
  const [flags, setFlags] = useState({});                   // To store country flags
  const [loading, setLoading] = useState(true);             // Loading state
  const [errorMessage, setErrorMessage] = useState("");     // To store error messages

  // Fetch countries from the backend on component mount
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/countrysource/api/countries/")
      .then((response) => {
        const countryNames = response.data.map(country => country.name);
        setCountries(response.data);                                              // Store the countries with id and name

        // Fetch flags from the REST Countries API
        return Promise.all(countryNames.map(name => {
          return axios
            .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then(flagResponse => {
              // Return the flag URL if found
              return {
                name: name,
                flag: flagResponse.data[0].flags.png                              // Or .svg for SVG flags
              };
            })
            .catch(() => ({
              name: name,
              flag: null                                                          // Handle case where country is not found
            }));
        }));
      })
      .then(flagData => {
        // Create a map of flags for easier access
        const flagsMap = flagData.reduce((acc, { name, flag }) => {
          acc[name] = flag;
          return acc;
        }, {});
        setFlags(flagsMap);
        setLoading(false);                                                        // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("There was an error fetching the country data!", error);
        setLoading(false);                                                        // Set loading to false even in case of error
      });
  }, []);

  // Filter countries based on the search input
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Set the error message if no countries match the search term
  useEffect(() => {
    if (searchTerm && filteredCountries.length === 0) {
      setErrorMessage(`No results found for "${searchTerm}"`);
    } else {
      setErrorMessage("");                                                        // Clear the error message when there's a match
    }
  }, [searchTerm, filteredCountries]);

  return (
    <div className="App">
      <div className="App-header">
        <h1>GeoGuide</h1>
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Show a loading message or spinner while the data is being fetched */}
      {loading ? (
        <div className="loading">Loading Countries...</div>
      ) : (
        <div>
          {/* Display error message if there is one */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          
          <div className="country-list">
            {filteredCountries.map((country) => (
              <div className="country-card" key={country.id}>
                {flags[country.name] ? (
                  <img src={flags[country.name]} alt={`${country.name} flag`} className="country-flag" />
                ) : (
                  <span>Flag not available</span>                                 // Handle case where flag is not available
                )}
                {country.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
