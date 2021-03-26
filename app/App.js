import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import _ from "lodash";
import canvas from "./utils/canvas";
import { ChakraProvider, Container, Heading, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import getWeb3 from "./utils/getWeb3";
import Canvas from "./components/Canvas";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import CurrentHover from "./components/CurrentHover";
import { colors } from './utils/colors';

const App = () => {
  const [squares, setSquares] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoverItem, setHoverItem] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("");
  const canvasRef = useRef(null);

  const fillSquares = (startX, startY, index, artwork) => {
    console.log(startX);
    const squareChunks = _.chunk(artwork, 5);
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 5; row++) {
        console.log(col, row);
        let color = colors[squareChunks[col][row]];
        draw(startX + col, startY + row, color);
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
      console.log("total", totalSquares);
      for (let i = 0; i < totalSquares; i++) {
        const sq = await canvas.methods.getSquare(i).call();
        sqs.push({
          coordX: Number(sq.coordX),
          coordY: Number(sq.coordY),
          ownerId: sq.ownerId,
          artwork: sq.artwork,
          squareId: i
        });
      }

      setSquares(sqs);
      setLoading(false);

      return sqs;
    };

    getOwner().then((sq) => {
      addSquaresToCanvas(sq);
    });
  }, []);

  useEffect(() => {
    handleWeb3();
  }, []);

  const calculateSpot = ({ coordX, coordY, index, artwork }) => {
    fillSquares(coordX, coordY, index, artwork);
  };

  const handleWeb3 = async () => {
    try {
      const web3 = await getWeb3();
      // Get user accounts
      const accounts = await web3.eth.getAccounts();
      setCurrentAddress(accounts[0]);
    } catch (error) {}
  };

  const addSquaresToCanvas = (sqs = []) => {
    console.log(`called at ${performance.now()}`);
    console.log("sqs", sqs);

    function _calculateCoordX(squareId) {
      return (squareId % 200) * 5;
    }

    function _calculateCoordY(squareId) {
      return Math.floor(squareId / 200) * 5;
    }

    let current = 0;
    while (current <= sqs.length) {
      if (sqs[current]) {
        calculateSpot({
          coordX: _calculateCoordX(current),
          coordY: _calculateCoordY(current),
          index: current,
          artwork: sqs[current].artwork,
        });
      }
      current++;
    }

    console.log(`finished at ${performance.now()}`);
  };

  return (
    <ChakraProvider>
      <Router>
        <Header />
        <MainApp>
          <div className="dash-items">
            <Canvas setHoverItem={setHoverItem} canvasRef={canvasRef} squares={squares} />
            <div className="sidebar">
              <h2 className="square-id">
                Square ID: {hoverItem?.squareId || '0'}
              </h2>
              <CurrentHover hoverItem={hoverItem} />
            </div>
          </div>
        </MainApp>
      </Router>
    </ChakraProvider>
  );
};

export default App;

const MainApp = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;

  p {
    position: absolute;
  }

  .dash-items {
    margin-top: 50px;
    display: flex;
    padding-bottom: 150px;

    .sidebar {
      h2.square-id {
        padding-bottom: 20px;
        font-weight: 700;
        font-size: 24px;
      }

      display: flex;
      flex-direction: column;
      background: var(--chakra-colors-gray-50);
      border-width: 1px;
      width: var(--chakra-sizes-64);
      flex: 1 1 0%;
      padding-bottom: var(--chakra-space-4);
      overflow-y: auto;
      padding-inline-start: var(--chakra-space-4);
      padding-inline-end: var(--chakra-space-4);
      padding-top: var(--chakra-space-5);
      padding-bottom: var(--chakra-space-4);
      overflow-wrap: break-word;
    }
  }

  #canvas-wrapper {
    transition: all 0.5s;
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
      transition: all 0.2s;
      height: 5px;
      border: 1px solid #b2222299;
      z-index: 5;
    }
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
