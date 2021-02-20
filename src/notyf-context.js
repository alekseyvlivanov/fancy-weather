import React from 'react';
import { Notyf } from 'notyf';

export default React.createContext(
  new Notyf({
    dismissible: true,
    duration: 2000,
    position: {
      x: 'center',
      y: 'top',
    },
    types: [
      {
        type: 'error',
        duration: 3000,
      },
    ],
  }),
);
