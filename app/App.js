import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import _ from 'lodash';
import canvas from './utils/canvas';

import ColorHash from "color-hash";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const colors = [
  "#ff0000",
  "#800080",
  "#000000",
  "#808080",
  "#ffffff",
  "#0000ff",
  "#00ffff",
  "#008000",
  "#ffff00",
];

const App = () => {
  const [squares, setSquares] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ scale, setScale ] = useState(1);
  const canvasRef = useRef(null);

  const fillSquares = (startX, startY, ownerId) => {
    for (let col = startX; col < startX + 5; col++) {
      for (let row = startY; row < startY + 5; row++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        draw(col, row, color);
      }
    }
  };

  const draw = (x, y, color) => {
    const canvasCurrent = canvasRef.current;
    const canvasContext = canvasCurrent.getContext("2d");

    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, 1, 1);
    canvasContext.fill();
  };

  useEffect(() => {
    const getOwner = async () => {
      let sqs = [];
      const totalSquares = await canvas.methods.totalSupply().call();
      console.log('total', totalSquares);
      for (let i = 0; i < totalSquares; i++) {
        const sq = await canvas.methods.getSquare(i).call();
        sqs.push({ coordX: sq.coordX, coordY: sq.coordY, ownerId: sq.ownerId });
      }

      setSquares(sqs);
      setLoading(false);
    }

    getOwner();
  }, []);

  useEffect(() => {
    setTimeout(() => fakeSquares(), 100);
  }, []);

  const calculateSpot = ({ coordX, coordY, ownerId }) => {
    fillSquares(Number(coordX), Number(coordY), ownerId);
  };

  const fakeSquares = () => {
    console.log(`called at ${performance.now()}`);

    function _calculateCoordX(squareId) {
      return ((squareId - 1) % 200) * 5;
    }

    function _calculateCoordY(squareId) {
      return Math.floor((squareId - 1) / 200) * 5;
    }

    let current = 0;
    while (current <= 40000) {
      calculateSpot({
        coordX: _calculateCoordX(current),
        coordY: _calculateCoordY(current),
        ownerId: Math.random(),
      });
      current++;
    }

    console.log(`finished at ${performance.now()}`);
  };

  const handleOnZoom = e => {
    setScale(e.scale);
  }

  const getMousePos = (evt) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: Math.round((evt.clientX - rect.left) / scale),
      y: Math.round((evt.clientY - rect.top) / scale)
    };
  }

  const onMouseMove = useMemo(() => {
    const throttled = _.throttle(e => {
      const mouse = getMousePos(e);
      console.log(squares)
      console.log('Mouse position: ' + mouse.x + ',' + mouse.y);
    }, 100);
    return e => {
      e.persist();
      return throttled(e);
    };
  }, [scale, squares]);

  return (
    <MainApp>
      <div id="canvas">
        <p>current scale {scale}</p>
        <div id="canvas-wrapper">
          <TransformWrapper
            options={{ maxScale: 50 }}
            defaultScale={1}
            defaultPositionX={500}
            defaultPositionY={500}
            onZoomChange={handleOnZoom}
          >
            {({ zoomIn, zoomOut,resetTransform, ...rest }) => (
              <TransformComponent>
                <canvas onMouseMove={onMouseMove} ref={canvasRef} width="1000" height="1000" id="canvas">
                  &nbsp;
                </canvas>
              </TransformComponent>
            )}
          </TransformWrapper>
        </div>
      </div>
    </MainApp>
  );
};

export default App;

const MainApp = styled.div`
  width: 100%;
  height: 1000px;
  position: relative;

  p {
    position: absolute;
  }


  #canvas {
    display: flex;
    justify-content: center;
  }

  #canvas-wrapper {
    margin-top: 100px;
    transition: all .5s;
    display: flex;
    justify-content: center;
    border: 10px solid brown;
  }

  button {
    position: fixed;
    left: 10px;
    top: 10px;
    z-index: 100;
  }

  canvas {
    width: 1000px;
    height: 1000px;
    image-rendering: pixelated;
    transition: scale 1s;
    background-color: #ddd;
    cursor: grab;
  }
`;
