import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import _ from 'lodash';
import canvas from './utils/canvas';

import ColorHash from "color-hash";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import getWeb3 from "./utils/getWeb3";

const colors = [
  '#000000',
  '#ffffff',
  '#663300',
  '#808080',
  '#FF0000',
  '#009900',
  '#0000FF',
  '#6600cc',
  '#FFFF00',
  '#CC6600',
  '#FF66B2',
  '#00CCCC'
]

const App = () => {
  const [squares, setSquares] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [scale, setScale] = useState(1);
  const delayedMousePos = useRef(_.throttle(q => handleFollowMouse(q), 50)).current;
  const canvasRef = useRef(null);

  const fillSquares = (startX, startY, index) => {
    let foundSquare = false;
    let squareChunks;

    if (squares[index]) {
      foundSquare = true;
      squareChunks = _.chunk(squares[index].artwork, 5);
    }
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 5; row++) {
        let color;
        if (foundSquare) {
          color = colors[squareChunks[col][row]];
        } else {
          color = colors[Math.floor(Math.random() * colors.length)];
        }

        draw(startX+col, startY+row, color);
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
        sqs.push({ coordX: Number(sq.coordX), coordY: Number(sq.coordY), ownerId: sq.ownerId, artwork: sq.artwork });
      }

      setSquares(sqs);
      setLoading(false);
    }
    
    getOwner();
  }, []);

  useEffect(() => {
    handleWeb3();
  }, []);

  const calculateSpot = ({ coordX, coordY, index }) => {
    fillSquares(coordX, coordY, index);
  };

  const handleWeb3 = async () => {
    try {
      const web3 = await getWeb3();
      // Get user accounts
      const accounts = await web3.eth.getAccounts();
      setCurrentAddress(accounts[0]);
    } catch(error) {

    }
  }

  const fakeSquares = () => {
    console.log(`called at ${performance.now()}`);
    console.log('sqs',squares);

    function _calculateCoordX(squareId) {
      return ((squareId) % 200) * 5;
    }

    function _calculateCoordY(squareId) {
      return Math.floor((squareId) / 200) * 5;
    }

    let current = 0;
    while (current <= 1000) {
      calculateSpot({
        coordX: _calculateCoordX(current),
        coordY: _calculateCoordY(current),
        index: current,
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

  const calculateCoordFromCoordinates = (x, y) => {
    return (((Math.floor(y/5)*5) / 5) * 200) + (Math.floor(x/5)*5)/5
  }

  const handleMouseMove = (e) => {
    const mouse = getMousePos(e);
    console.log(squares)
    const position = calculateCoordFromCoordinates(mouse.x, mouse.y);
    console.log(`position is ${position}`);
    console.log('hovering over ', squares);
    console.log('Mouse position: ' + mouse.x + ',' + mouse.y);
  }

  const handleFollowMouse = (e) => {
    const mouse = getMousePos(e);
    const hover = document.getElementById('hover-item');
    hover.style.top = `${(Math.floor(mouse.y/5) *5)}px`;
    hover.style.left = `${(Math.floor(mouse.x/5) *5)}px`;
  }

  const onMouseMove = (e) => {
    e.persist();
    handleMouseMove(e);
    delayedMousePos(e)
  }

  return (
    <MainApp>
      <div id="canvas">
        <div style={{position: 'absolute', fontWeight: 700, top: '20px'}} className="current-address">{currentAddress || 'not connected'}</div>
        <button onClick={() => fakeSquares()}>get</button>
                
        <p>current scale {scale}</p>
        <div id="canvas-wrapper">
          <TransformWrapper
            options={{ maxScale: 50, centerContent: true }}
            defaultScale={1}
            defaultPositionX={500}
            defaultPositionY={500}
            
            onZoomChange={handleOnZoom}
          >
            {({ zoomIn, zoomOut,resetTransform, ...rest }) => (
              <TransformComponent>
                <div id="hover-item"></div>
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

    .react-transform-element {
      position: relative;
    }

    #hover-item {
      cursor: grab;
      position: absolute;
      width: 5px;
      transition: all .2s;
      height: 5px;
      border: 1px solid #b2222299;
      z-index: 5;
      border-radius: 50%;
    }
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
