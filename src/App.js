import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import Rules from './components/Rules';
import NotFound from './components/NotFound';

function App() {

  return (
    <Router>
      <div className>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    
      </div>
    </Router>
  );
}

export default App;