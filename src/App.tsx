import React from 'react';
import { ICard } from './components/Card';
import CardGallery from './components/CardGallery';

function App() {
  const cards: ICard[] = [
    {
      title: 'Knowledge Base',
      teaser: 'Contains code snippets, technical articles, and blog posts related to various technologies',
      content: 'Dummy content'

    },
    {
      title: 'Magic of CSS',
      teaser: 'A visual tutorial of many CSS concepts',
      link: 'https://adamschwartz.co/magic-of-css/',
      content: 'Dummy content'
    },
    {
      title: 'Styled-Components Getting Started Guide',
      teaser: 'A first-party beginner\'s tutorial to the styled-components library',
      content: 'Dummy content'

    },
    {
      title: 'Basic Concepts of Flexbox',
      teaser: 'A tutorial from mozilla that explains how CSS flexbox works',
      content: 'Dummy content'
    },
    {
      title: 'Knowledge Base',
      teaser: 'Contains code snippets, technical articles, and blog posts related to various technologies',
      content: 'Dummy content'

    },
    {
      title: 'Magic of CSS',
      teaser: 'A visual tutorial of many CSS concepts',
      link: 'https://adamschwartz.co/magic-of-css/',
      content: 'Dummy content'
    },
    {
      title: 'Styled-Components Getting Started Guide',
      teaser: 'A first-party beginner\'s tutorial to the styled-components library',
      content: 'Dummy content'

    },
    {
      title: 'Basic Concepts of Flexbox',
      teaser: 'A tutorial from mozilla that explains how CSS flexbox works',
      content: 'Dummy content'
    },
    {
      title: 'Knowledge Base',
      teaser: 'Contains code snippets, technical articles, and blog posts related to various technologies',
      content: 'Dummy content'

    },
    {
      title: 'Magic of CSS',
      teaser: 'A visual tutorial of many CSS concepts',
      link: 'https://adamschwartz.co/magic-of-css/',
      content: 'Dummy content'
    },
    {
      title: 'Styled-Components Getting Started Guide',
      teaser: 'A first-party beginner\'s tutorial to the styled-components library',
      content: 'Dummy content'

    },
    {
      title: 'Basic Concepts of Flexbox',
      teaser: 'A tutorial from mozilla that explains how CSS flexbox works',
      content: 'Dummy content'
    },
  ]
  return (
    <div className="App">
      <CardGallery cards={cards} />
    </div>
  );
}

export default App;
