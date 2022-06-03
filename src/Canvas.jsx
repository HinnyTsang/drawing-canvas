import React, { useState, useEffect, useRef } from 'react'

// all color used, modify color here if needed.
const colorList = [
 '#000000',
 '#C0C0C0',
 '#808080',
 '#FFFFFF',
 '#800000',
 '#FF0000',
 '#800080',
 '#FF00FF',
 '#008000',
 '#00FF00',
 '#808000',
 '#FFFF00',
 '#000080',
 '#0000FF',
 '#008080',
 '#00FFFF',
];



const Canvas = () => {

  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('000000');
  const [ColorButtons, setColorButtons] = useState();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  
  //  call when the app initialized.
  useEffect(() => {

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    contextRef.current = context;
    
    setColorButtons (colorList.map(
      c => 
      <div 
        className='button--color'
        key={c}
        style={{backgroundColor:c}}
        onClick={(e) =>  setColor(c)}
      />
    ))

  },[]);



  // switch the start drawing case, 
  // update the canvas if necessary.
  const handleOnMouseDown = e => {

    const canvas = canvasRef.current;
    
    // check if resize needed. 
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    // resize if the canvas width not equal to the current width.
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    contextRef.current.beginPath();
    setDrawing(true);
  }

  // stop drawing when the mouse is up
  const handleOnMouseUp = e => setDrawing(false);

  // function to handle drawing
  const handleOnMouseMove = e => {
    if (drawing) {
      const canvas = canvasRef.current;
      const context = contextRef.current;
      context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      context.lineWidth = 1;
      context.lineCap = 'round';
      context.strokeStyle = color;
      context.stroke();
    }
  }

  // function to clean the canvas.
  const handleClean = e => {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  return (
    <div className='canvas--container'>
      <canvas id='canvas'
          onMouseDown={handleOnMouseDown}
          onMouseUp={handleOnMouseUp}
          onMouseMove={handleOnMouseMove}
          ref={canvasRef}
      />
      <div className='canvas--row'>
        <div className='button-set--color'>
          {ColorButtons}
        </div>
        <div className='button--clean' onClick={handleClean}>
          <span>clean</span>
        </div>
      </div>
    </div>
  )
}

export default Canvas