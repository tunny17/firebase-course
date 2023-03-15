import './App.css';
import React, { useEffect, useState } from 'react';
import { Auth } from './components/Auth';
import { db, auth, storage } from './config/firebase';
// this function is used to get a bunch of data collections from the database
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { async } from '@firebase/util';


const App = () => {
  const [movieList, setMovieList] = useState([]);

  // new movie states
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  // update title state
  const [updatedTitle, setUpdatedTitle] = useState('');

  // reference of the data
  const moviesCollectionRef = collection(db, 'movies');

  // state for file upload (storage)
  const [fileUpload, setFileUpload] = useState(null)

  



  // deletes movies
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    await deleteDoc(movieDoc);
  }

  // updates movie title
  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    await updateDoc(movieDoc, {title: updatedTitle});
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
      // console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  }


  // uploads file
  const uploadFile = async () => {
    if (!fileUpload) return;
    // path of the file to be uploaded to
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    // uploads the selected file to the file path
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch(err) {
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
        recievedAnOscar: isNewMovieOscar,
        // added a userId property to get the id to be able to check for auth
        userId: auth?.currentUser?.uid,
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

            <input 
              placeholder='New Title...'
              onChange={(e) => setUpdatedTitle(e.target.value)}  
            />
            <button  onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>

      <div>
        <input 
          type="file" 
          onChange={(e) => setFileUpload(e.target.files[0])} 
        />
        <button onClick={uploadFile}> Upload File</button>
      </div>

    </div>
  )
}

export default App