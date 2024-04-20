import "./App.css";
import WeatherHeading from "./components/WeatherHeading";
import WeatherApp from './components/WeatherApp'

function App() {
  return (
    <div className="App">
      <WeatherHeading />
      <div className="flex items-center justify-center h-[80vh]">
        <WeatherApp/>
      </div>
    </div>
  );
}

export default App;