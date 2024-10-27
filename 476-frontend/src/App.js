import React from 'react';
import CreateMonster from './CreateMonster';
import AddDrop from './AddDrop';
import GetDrops from './GetDrops';

const App = () => {
  return (
    <div>
      <h1>Monster Drop Logger</h1>
      <CreateMonster />
      <AddDrop />
      <GetDrops />
    </div>
  );
};

export default App;
