import { Helmet } from "react-helmet";

import ControlPanel from './components/ControlPanel/ControlPanel';
import CardGallery from './components/CardGallery/CardGallery';


import './app.scss'

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Helmet>
      <ControlPanel />
      <CardGallery/>
    </div>
  );
}

export default App;
