import React, { useEffect, useState } from 'react';

export const AppContext = React.createContext();

const Provider = (props) => {
  return (
    <AppContext.Provider>
      {props.children}
    </AppContext.Provider>
  )
}

export default Provider;