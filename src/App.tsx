import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";

import { ICard } from './components/Card/Card';
import ControlPanel from './components/ControlPanel/ControlPanel';
import CardGallery from './components/CardGallery/CardGallery';

import axios from 'axios';


function App() {
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URI}/shares/`).then(response => {
      setCards(response.data)
    }).catch(error => {
      console.log(error);
    })
  }, []);

  return (
    <div className="App">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Helmet>
      <ControlPanel setCards={setCards} cards={cards} />
      <CardGallery cards={cards} />
    </div>
  );
}

export default App;
