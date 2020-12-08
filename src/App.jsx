import React, { useEffect, useState } from 'react';
import './App.css';
import { getImagesList } from './api/images.js';
import { ModalWindow } from './components/ModalWindow/ModalWindow';
import CircularProgress from '@material-ui/core/CircularProgress';


function App() {
  const [imagesList, setImagesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState('');
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    getImagesList()
      .then(setImagesList)
  }, []);

  return (
    <>
    
    <div className="app">
    
      <header className="header">
        <h1 className="header__title">Test App</h1>
      </header>
      {imagesList.length === 0 &&
        <CircularProgress />
      }
      <div>
        {imagesList &&
          <ul className="gallery-list">
            {imagesList.map(item => (
              <li key={item.image_id} className="gallery-list__item">
                <img
                  alt="nature"
                  src={item.src}
                  onClick={() => {
                    setCurrentImg(item.src);
                    setOpen(true);
                    setCurrentId(item.image_id);
                  }}
                  className="gallery-list__image"
                />
              </li>
            ))}
          </ul>
        }
        {open &&
          <ModalWindow
            setOpen={setOpen}
            currentId={currentId}
            currentImg={currentImg}
          />
        }
        
      </div>
      <footer className="footer">
        <h2>&#169; 2018-2019</h2>
      </footer>
    </div>
    
    </>
  );
}

export default App;
