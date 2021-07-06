import React from 'react';
import './App.scss';

import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route exact path='/' component={Login} />
        </header>
      </div>
    </Router>
  );
}

export default App;
