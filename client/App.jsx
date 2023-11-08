import { Routes, Route } from 'react-router-dom';

const App = () => {

    return (
      <Router>
        <Route path="/" element={<HomePage />} />
      </Router>
    );
  }

  export default App;
