import './App.css';
import React, { useEffect, useState } from 'react';
import { Auth } from './components/Auth';
import { db } from './config/firebase';
// this function is used to get a bunch of data collections from the database
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { async } from '@firebase/util';

const App = () => {

  const [movieList, setMovieList] = useState([]);

  // new movie states
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  // reference of the data
  const moviesCollectionRef = collection(db, 'movies');

  // deletes movies
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    await deleteDoc(movieDoc);
  }

  // displays movie data
  const getMovieList = async () => {
    // read data from database
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), 
        id: doc.id,
      }));
      setMovieList(filteredData);
      console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  }

  // useEffect to render the data(movie list) immediately the page loads up
  useEffect(() => {
    getMovieList();
  }, [])

  // onsubmit function for the submit button
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, { 
        title: newMovieTitle, 
        releaseDate: newReleaseDate, 
        recievedAnOscar: isNewMovieOscar 
      });

      getMovieList();
    } catch (err) {
      console.error(err);
    }
  }


  
  return (
    <div  className='app'>
      <Auth />

      <div>
        <input 
          placeholder='Movie Title...' 
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input 
          placeholder='Release Date...'  
          type='number'
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input 
          type='checkbox' 
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}  
        />
        <label>Received an Oscar</label>
        <button  onClick={onSubmitMovie}>Submit Movie</button>
      </div>


      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.recievedAnOscar ? 'green' : 'red' }}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App