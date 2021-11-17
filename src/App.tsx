import React from 'react';
import { ICard } from './components/Card/Card';
import ControlPanel from './components/ControlPanel/ControlPanel';
import CardGallery from './components/CardGallery/CardGallery';

import castle1 from './img/castle1.jpg';
import castle2 from './img/castle2.jpg';
import retro_fisher from './img/retro_fisher.jpg';
import retro_space from './img/retro_space.jpg';


function App() {
  const cards: ICard[] = [
    {
      title: 'Knowledge Base',
      teaser: 'Contains code snippets, technical articles, and blog posts related to various technologies',
      content: 'Dummy content',
      tags: ['portfolio'],
      img_url: castle1
    },
    {
      title: 'Magic of CSS',
      teaser: 'A visual tutorial of many CSS concepts',
      link: 'https://adamschwartz.co/magic-of-css/',
      content: 'Dummy content',
      tags: ['css', 'design', 'style'],
      img_url: castle2
    },
    {
      title: 'Styled-Components Getting Started Guide',
      teaser: 'A first-party beginner\'s tutorial to the styled-components library',
      content: 'Dummy content',
      tags: ['css', 'design', 'style', 'react'],
      img_url: retro_fisher
    },
    {
      title: 'Basic Concepts of Flexbox',
      teaser: 'A tutorial from mozilla that explains how CSS flexbox works',
      content: 'Dummy content',
      tags: ['css', 'design', 'style'],
      img_url: retro_space
    },
    {
      title: 'Knowledge Base',
      teaser: 'Contains code snippets, technical articles, and blog posts related to various technologies',
      content: 'Dummy content',
      tags: ['portfolio'],
      img_url: castle1
    },
    {
      title: 'Magic of CSS',
      teaser: 'A visual tutorial of many CSS concepts',
      link: 'https://adamschwartz.co/magic-of-css/',
      content: 'Dummy content',
      tags: ['css', 'design', 'style'],
      img_url: castle2
    },
    {
      title: 'Styled-Components Getting Started Guide',
      teaser: 'A first-party beginner\'s tutorial to the styled-components library',
      content: 'Dummy content',
      tags: ['css', 'design', 'style', 'react'],
      img_url: retro_fisher
    },
    {
      title: 'Basic Concepts of Flexbox',
      teaser: 'A tutorial from mozilla that explains how CSS flexbox works',
      content: 'Dummy content',
      tags: ['css', 'design', 'style'],
      img_url: retro_space
    },
  ]
  return (
    <div className="App">
      <ControlPanel />
      <CardGallery cards={cards} />
    </div>
  );
}

export default App;
