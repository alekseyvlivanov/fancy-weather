import React from 'react';
import { Notyf } from 'notyf';

export default React.createContext(
  new Notyf({
    dismissible: true,
    duration: 3000,
    position: {
      x: 'center',
      y: 'top',
    },
  }),
);
