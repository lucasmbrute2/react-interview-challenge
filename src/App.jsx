import { useState } from "react";
import "./App.css";

function App() {
    const [arrOfPositions, setArrOfPositions] = useState([]);
    const [removedCircle, setRemovedCircle] = useState([]);

    const setCircle = (e) => {
        if (e.target.type === "button") return;

        const { pageX } = e;
        const { pageY } = e;

        const ctx = {
            pageY,
            pageX,
        };

        setArrOfPositions([...arrOfPositions, ctx]);
    };

    const setPositions = (set, arrOfPositions, lastPosition) => {
        set(arrOfPositions.filter((position) => position !== lastPosition));
    };

    const handleUndoButton = () => {
        const positionToBeRemoved = arrOfPositions.at(-1);

        if (!positionToBeRemoved) return;

        setRemovedCircle([...removedCircle, positionToBeRemoved]);
        setPositions(setArrOfPositions, arrOfPositions, positionToBeRemoved);
    };

    const handleClearAllButton = () => {
        setArrOfPositions([]);
        setRemovedCircle([]);
    };

    const handleReDoButton = (e) => {
        const lastPosition = removedCircle.at(-1);
        if (!lastPosition) return;

        setArrOfPositions([...arrOfPositions, lastPosition]);
        setPositions(setRemovedCircle, removedCircle, lastPosition);
    };

    return (
        <div className="App" onClick={setCircle}>
            {arrOfPositions.map((positions, i) => (
                <div
                    key={i}
                    style={{
                        backgroundColor: "#172E7C",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        position: "absolute",
                        top: positions.pageY - 4,
                        left: positions.pageX - 4,
                    }}
                ></div>
            ))}

            <button onClick={handleUndoButton} type="button">
                Undo
            </button>
            <button onClick={handleClearAllButton} type="button">
                Clear All
            </button>
            <button onClick={handleReDoButton} type="button">
                Re do
            </button>
        </div>
    );
}
export default App;
