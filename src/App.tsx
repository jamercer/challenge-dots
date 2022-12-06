import React, { CSSProperties, MouseEvent, useState } from 'react';
import './App.css';
import dot, { point } from './dot';

function App() {
  const [pointerPos, setPointerPos] = useState<point>({x:0, y:0});
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

  const mouseMoveAction = (e:MouseEvent) => {
    setPointerPos({x:e.pageX, y:e.pageY});
  }

  const stopProp = (e:MouseEvent) => {
    e.stopPropagation();
  }

  const undo = (e:MouseEvent) => {
    if (dotList.length === 0) return;
    const lastPoint = dotList.pop();
    if (lastPoint !== undefined) {
        setDotList(dotList);
        setUndoDots([...undoDots, lastPoint]);
    }
  }

  const redo = (e:MouseEvent) => {
    if (undoDots.length === 0) return;
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
      return dot(style,i);
    });
  }

  const renderNewDot = (dotStart: point|undefined, mousePos: point) => {
    if (dotStart === undefined) return;

    const diff: point = {x: dotStart.x-mousePos.x, y: dotStart.y-mousePos.y};
    const magnitude: number = Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2));
    const scale: number = Math.max(1, magnitude / 32);
    const rot: number = Math.atan2(diff.y, diff.x);
    const transformStyle: string = 'rotate('+rot+'rad) translateX(-'+magnitude/2+'px) scaleX('+scale+')'
    
    const style: CSSProperties = {
      position: 'absolute',
      left: dotStart.x - 16,
      top: dotStart.y - 16,
      transform: transformStyle,
    }
    return dot(style,'lol', true);
  }

  return (<div>
    <div className="App" onMouseDown={mouseDownAction} onMouseUp={mouseUpAction} onMouseMove={mouseMoveAction}>
      <div className='button-well'>
        <button onMouseDown={stopProp} onMouseUp={mouseUpAction} onClick={undo}>undo</button>
        <button onMouseDown={stopProp} onMouseUp={mouseUpAction} onClick={redo}>redo</button>
      </div>
      {renderDots(dotList)}
      {renderNewDot(newDot, pointerPos)}
    </div>
  </div>);
}

export default App;
