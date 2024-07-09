import { Plane } from "@react-three/drei";
import { PlaneScreen } from "./PlaneScreen";
import { Test } from "./Test";


function App() {
  return (
    <div className="App">
      <div style={{ flex: 1, overflow: "hidden" }} className="PlaneScreen">
        <PlaneScreen />
      </div>
      {/* <div style={{ flex: 1, overflow: "hidden" }} className="Test">
        <POIScreen />
        </div> */}

    </div>
  );
}

export default App;
