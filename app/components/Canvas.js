import _ from 'lodash';
import React, { useRef, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { getMousePos } from '../utils/funcs';


const Canvas = React.memo(({ squares, canvasRef, setHoverItem, selected, setSelected }) => {
  const [scale, setScale] = useState(1);
  const delayedMousePos = _.throttle(e => handleFollowMouse(e), 100);

  const handleOnZoom = e => {
    setScale(e.scale);
  }

  const calculateCoordFromCoordinates = (x, y) => {
    return (((Math.floor(y/5)*5) / 5) * 200) + (Math.floor(x/5)*5)/5
  }

  const handleMouseMove = (mouse) => {
    const position = calculateCoordFromCoordinates(mouse.x, mouse.y);
    if (squares[position]) {
      setHoverItem(squares[position])
    } else {
      setHoverItem({ squareId : position, coordX: Math.floor(mouse.x/5)*5, coordY: Math.floor(mouse.y/5)*5, artwork: _.times(25, _.constant(0)), ownerId: null })
    }
  }

  const handleFollowMouse = (e) => {
    const mouse = getMousePos(e, scale, canvasRef);
    handleMouseMove(mouse);
    const hover = document.getElementById('hover-item');
    hover.style.top = `${(Math.floor(mouse.y/5) *5)}px`;
    hover.style.left = `${(Math.floor(mouse.x/5) *5)}px`;
  }

  const onMouseMove = (e) => {
    e.persist();
    delayedMousePos(e)
  }

  return (
    <div id="canvas-wrapper">
      <TransformWrapper
        options={{ maxScale: 50}}
        defaultScale={1}
        defaultPositionX={500}
        defaultPositionY={500}
        onZoomChange={handleOnZoom}
      >
        {({ zoomIn, zoomOut,resetTransform, setPositionX, setPositionY, ...rest }) => (
          <TransformComponent>
            <div id="hover-item"></div>
            <canvas onMouseMove={onMouseMove} ref={canvasRef} width="1000" height="1000" id="canvas">
              &nbsp;
            </canvas>
          </TransformComponent>
        )}
      </TransformWrapper>
    </div>
  )
});

export default Canvas;