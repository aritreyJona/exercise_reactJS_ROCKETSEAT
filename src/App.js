import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repos, setRepos] = useState([{ title: "hallo", id: "world" }]);

  async function handleAddRepository() {
    const response = await api.post(`/repositories`, {
      title: "new Title",
      url: "www.johanna.de",
      techs: ["my", "list"],
    });
    console.log(response.data);
    if (response.status === 200) {
      setRepos([...repos, response.data]);
    } else console.log("there was a problem while creating a new repo");
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if (response.status != 204) {
      alert("something went wrong");
    } else {
      const newRepos = [];
      repos.map((repo) => (repo.id != id ? newRepos.push(repo) : null));
      setRepos(newRepos);
    }
  }

  useEffect(() => {
    api.get("/repositories").then((response) => setRepos(response.data));
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
