import { useState, useEffect } from 'react';

function App() {

  useEffect(() => {
    fetch('https://openlibrary.org/search.json?title=hound+of+the+baskervilles')
            .then(res=>res.json())
            .then(json=>console.log(json))
  });

  return (<></>);
}

export default App
