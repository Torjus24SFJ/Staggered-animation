import "./App.css";
import StaggerBoxes from "./components/StaggerBoxes";
import HorizontalScroller from "./components/HorizontalScroller";


function App() {
  
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4">
          <StaggerBoxes />
        </div>
      </div>

      <div className="h-screen bg-linear-to-b from-gray-50 to-gray-100" />

      <HorizontalScroller />

      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <h2 className="text-6xl font-bold text-white">End</h2>
      </div>
    </>
  );
}

export default App;
