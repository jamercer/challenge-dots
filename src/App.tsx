import React, { CSSProperties, MouseEvent, useState } from 'react';
import logo from './logo.svg';
import './App.css';


interface point {
  x: number,
  y: number,
}

function App() {
  const [dotList, setDotList] = useState<point[]>([{x:0, y:0}]);
  const [undoSteps, setUndoSteps] = useState(0 as number);

  const clickAction = (e:MouseEvent) => {
    e.preventDefault();
    const newPoint: point = {x:e.clientX, y:e.clientY};
    setDotList([...dotList, newPoint]);
  }
  
  const renderDots = (list:point[]) => {
    return list.map((p,i,arr) => {
      if (arr.length - i < undoSteps) return true;
      const style: CSSProperties = {
        position: 'absolute',
        left: p.x - 16,
        top: p.y - 16,
      }
      return <div className='dot' style={style}></div>
    });
  }

  return (<div>
      <button onClick={()=>{
        setUndoSteps(Math.min(undoSteps + 1, dotList.length));
        }}>undo</button>
      <button onClick={()=>{
        setUndoSteps(Math.max(undoSteps - 1, 0));
        }}>redo</button>
    <div className="App" onClick={clickAction}>
      {renderDots(dotList)}
    </div>
  </div>
    
  );
}

export default App;
