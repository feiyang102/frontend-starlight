import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
      <div>
        <h1>子应用👇</h1>
        <micro-app name="my-app" url="http://localhost:4001/"></micro-app>
        <micro-app
          name="my-app"
          url="http://localhost:4002/"
          iframe
        ></micro-app>
      </div>
    </div>
  );
}

export default App;
