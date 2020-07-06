import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repos, setRepos] = useState([{ title: "hallo", id: "world" }]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState("");

  async function handleAddRepository() {
    const myTechs = techs.replaceAll(" ", "").split(",");
    if ("" === title || "" === url || 0 === myTechs.length) {
      alert("You need to fill in title, url and techs!");
    }
    const response = await api.post(`/repositories`, {
      title,
      url,
      techs: myTechs,
    });
    console.log(response.data);
    if (response.status === 200) {
      setRepos([...repos, response.data]);
    } else console.log("there was a problem while creating a new repo");
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if (response.status !== 204) {
      alert("something went wrong");
    } else {
      const newRepos = [];
      repos.map((repo) => (repo.id !== id ? newRepos.push(repo) : null));
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
      <h4>Title:</h4>
      <input value={title} onChange={(evt) => setTitle(evt.target.value)} />
      <h4>URL:</h4>
      <input value={url} onChange={(evt) => setUrl(evt.target.value)} />
      <h4>techs:</h4>
      <input
        value={techs}
        placeholder={`please write the techs seperated with "," and without spaces`}
        onChange={(evt) => setTechs(evt.target.value)}
      />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
