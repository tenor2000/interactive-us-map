import Footer from "./sections/Footer";
import "./App.css";
import MapArea from "./sections/MapArea";
import MenuBar from "./sections/MenuBar";

function App() {
  return (
    <div className="height-[100vh]">
      <MenuBar />
      <MapArea />
      <Footer />
    </div>
  );
}

export default App;
