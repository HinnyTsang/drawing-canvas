import React, { useState, useEffect, useRef } from 'react'

const Canvas = () => {

  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('000000');
  const [ColorButtons, setColorButtons] = useState();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  
  //  call when the app initialized.
  useEffect(() => {

    let colorList = new Array(20);
    // create color platte
    for (var i = 0; i < colorList.length; ++i) {
      
      const angle = i / colorList.length;

      var r = Math.sin(2*Math.PI * (angle + 0/3));
      var g = Math.sin(2*Math.PI * (angle + 1/3));
      var b = Math.sin(2*Math.PI * (angle + 2/3));

      r = (Math.min(Math.max(r, -0.5), 0.5) + 0.5 ) * 255;
      g = (Math.min(Math.max(g, -0.5), 0.5) + 0.5 ) * 255;
      b = (Math.min(Math.max(b, -0.5), 0.5) + 0.5 ) * 255;

      colorList[i] = `rgba(${r}, ${g}, ${b}, 1)`;
    }
    // add white and black in the color paltte.
    colorList.push('rgba(255,255,255, 1)', 'rgba(0, 0, 0, 1)');

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    contextRef.current = context;
    
    setColorButtons (colorList.map(
      (c, i) => 
      <div 
        className='button--color'
        key={c}
        style={{backgroundColor:c}}
        onClick={ e =>  setColor(c)}
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
          onTouchStart={handleOnMouseDown}
          onTouchEnd={handleOnMouseUp}
          onTouchMove={handleOnMouseMove}
          ref={canvasRef}
          style={{boxShadow: `0 0 5px 0px ${color}`}}
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