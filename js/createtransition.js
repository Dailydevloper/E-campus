import React, { useState, useEffect } from 'react';

// Define the shape of your expected data (optional but good practice)
// Replace 'User' with the name of the data you expect (e.g., 'Product', 'Post')
// const initialData = { id: null, name: '', email: '' };

function DataFetcherComponent() {
  // 1. State for the data
  const [data, setData] = useState(null); 
  
  // 2. State for loading status
  const [isLoading, setIsLoading] = useState(true);
  
  // 3. State for any errors
  const [error, setError] = useState(null);

  // Define the API endpoint you will use
  const API_ENDPOINT = 'YOUR_BACKEND_API_URL/resource'; 

  // Function to fetch data from the API
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // --- THIS IS WHERE YOU WILL INTEGRATE YOUR BACKEND ---
      const response = await fetch(API_ENDPOINT);

      // Check for HTTP errors (e.g., 404, 500)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      
      // Update the data state
      setData(result); 

    } catch (err) {
      // Update the error state if the fetch fails
      setError(err.message); 
    } finally {
      // Set loading to false regardless of success or failure
      setIsLoading(false); 
    }
  };

  // 4. useEffect to call fetchData when the component mounts
  useEffect(() => {
    fetchData(); 
  }, []); // The empty array ensures this runs only once on mount

  // --- RENDERING LOGIC ---
  if (isLoading) {
    return <div>**Loading data...**</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>**Error:** {error}</div>;
  }
  
  // Check if data is null or empty before rendering the main content
  if (!data) {
    return <div>No data found.</div>;
  }

  // --- Display the fetched data (customize this part) ---
  return (
    <div>
      <h2>✅ Data Fetched Successfully</h2>
      {/* Replace the following lines with how you want to display your data.
        Example assumes the API returns an object or an array.
      */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      
      {/* Example for displaying data if 'data' is an object with a 'title' field */}
      {/* <h3>{data.title}</h3> */} 
    </div>
  );
}

export default DataFetcherComponent;