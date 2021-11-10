import React from 'react';
import { ICard } from './components/Card';
import CardGallery from './components/CardGallery';

function App() {
  const cards: ICard[] = [
    {
      title: 'Knowledge Base',
      content: 'Contains code snippets, technical articles, and blog posts related to various technologies' 
    },
    {
      title: 'Magic of CSS',
      content: 'A visual tutorial of many CSS concepts' 
    },
    {
      title: 'Styled-Components Getting Started Guide',
      content: 'A first-party beginner\'s tutorial to the styled-components library' 
    },
    {
      title: 'Basic Concepts of Flexbox',
      content: 'A tutorial from mozilla that explains how CSS flexbox works'
    },
  ] 
  return (
    <div className="App">
      <CardGallery cards={cards}/>
    </div>
  );
}

export default App;
