import React from "react";
import Helmet from "react-helmet";
import logo from "./assets/images/logo.svg";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Virtual Wallet - Stone</title>
        <meta
          name="description"
          content="Desafio técnico Carteira Virtual desenvolvido para a Stone"
        />
        <link rel="icon" href="assets/images/favicon.ico" />
      </Helmet>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
