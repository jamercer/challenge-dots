import React, { CSSProperties, MouseEvent, useState } from 'react';
import logo from './logo.svg';
import './App.css';


interface point {
  x: number,
  y: number,
}

function App() {
  const [dotList, setDotList] = useState<point[]>([]);
  const [undoDots, setUndoDots] = useState<point[]>([]);

  const clickAction = (e:MouseEvent) => {
    e.preventDefault();
    const newPoint: point = {x:e.clientX, y:e.clientY};
    setDotList([...dotList, newPoint]);
    setUndoDots([]);
  }
  
  const undo = () => {
    if (dotList.length == 0) return;
    const lastPoint = dotList.pop();
    if (lastPoint !== undefined) {
        setDotList(dotList);
        setUndoDots([...undoDots, lastPoint]);
    }
  }

  const redo = () => {
    if (undoDots.length == 0) return;
    const lastUndo = undoDots.pop();
    if (lastUndo !== undefined) {
      setUndoDots(undoDots);
      setDotList([...dotList, lastUndo]);
    }
  }

  const renderDots = (list:point[]) => {
    return list.map((p,i,arr) => {
      const style: CSSProperties = {
        position: 'absolute',
        left: p.x - 16,
        top: p.y - 16,
      }
      return <div className='dot' style={style} key={i}></div>
    });
  }

  return (<div>
    <div className="App" onClick={clickAction}>
      <div className='button-well'>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>
      </div>
      {renderDots(dotList)}
    </div>
  </div>);
}

export default App;
