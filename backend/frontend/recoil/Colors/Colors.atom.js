import { atom } from 'recoil';

// Define an atom for managing colors
const colorsAtom = atom({
  key: 'colorsAtom',
  default: [
        {
          id: 1,
          isOpen: false,
          variableName: 'Primary',
          hexCode: '#009FF5', // You can adjust the hex code to the desired value
        },
        {
          id: 2,
          isOpen: false,
          variableName: 'Secondary',
          hexCode: '#FF0000',
        },
        {
          id: 3,
          isOpen: false,
          variableName: 'Neutrals',
          hexCode: '#808080', 
        },
        {
          id: 4,
          isOpen: false,
          variableName: 'Success',
          hexCode: '#28A745',
        },
        {
          id: 5,
          isOpen: false,
          variableName: 'Warning',
          hexCode: '#FFC107', 
        },
        {
          id: 6,
          isOpen: false,
          variableName: 'Error',
          hexCode: '#DC3545', 
        },
  ],
});

export default colorsAtom;