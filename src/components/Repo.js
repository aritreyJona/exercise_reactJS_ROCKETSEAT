import React from "react";

const Repo = (props) => {
  return (
    <li>
      Repositório 1<button onClick={() => props.onPress()}>Remover</button>
    </li>
  );
};

export default Repo;
