import React, { CSSProperties, MouseEvent, useState } from 'react';
import logo from './logo.svg';
import './App.css';


interface point {
  x: number,
  y: number,
}

function App() {
  const [newDot, setNewDot] = useState<point|undefined>();
  const [dotList, setDotList] = useState<point[]>([]);
  const [undoDots, setUndoDots] = useState<point[]>([]);

  const mouseDownAction = (e:MouseEvent) => {
    e.preventDefault()
    setNewDot({x:e.pageX, y:e.pageY});
  }

  const mouseUpAction = (e:MouseEvent) => {
    e.preventDefault();
    if (newDot !== undefined){
      setDotList([...dotList, newDot]);
      setNewDot(undefined);
      setUndoDots([]);
    }
  }
  
  const stopProp = (e:MouseEvent) => {
    e.stopPropagation();
  }

  const undo = (e:MouseEvent) => {
    if (dotList.length == 0) return;
    const lastPoint = dotList.pop();
    if (lastPoint !== undefined) {
        setDotList(dotList);
        setUndoDots([...undoDots, lastPoint]);
    }
  }

  const redo = (e:MouseEvent) => {
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
    <div className="App" onMouseDown={mouseDownAction} onMouseUp={mouseUpAction}>
      <div className='button-well'>
        <button onMouseDown={stopProp} onMouseUp={mouseUpAction} onClick={undo}>undo</button>
        <button onMouseDown={stopProp} onMouseUp={mouseUpAction} onClick={redo}>redo</button>
      </div>
      {renderDots(dotList)}
    </div>
  </div>);
}

export default App;
