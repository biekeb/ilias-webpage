import { PlaneScreen } from "../components/PlaneScreen";


// import { POIScreen } from "../components/POIScreen";

function App() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flex: 1, overflow: "hidden" }} className="PlaneScreen">
        <PlaneScreen />
      </div>
      {/* <div style={{ flex: 1, overflowY: "scroll" }} className="POIScreen">
        <POIScreen />
      </div> */}
    </div>
  );
}

export default App;
