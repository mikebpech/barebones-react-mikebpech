export const getMousePos = (evt, scale, canvasRef) => {
  const rect = canvasRef.current.getBoundingClientRect();
  return {
    x: Math.round((evt.clientX - rect.left) / scale),
    y: Math.round((evt.clientY - rect.top) / scale)
  };
}