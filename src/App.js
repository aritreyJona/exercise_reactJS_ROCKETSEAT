import React from "react";

import "./styles.css";
import Repo from "./components/Repo";
import api from "./services/api";

function App() {
  const [repos, setRepos] = useState([]);

  async function handleAddRepository() {
    // TODO
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  async function getRepos() {}

  return (
    <div>
      <ul data-testid="repository-list">
        <Repo onPress={handleRemoveRepository(1)} />
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
