import { atom } from 'recoil';

// Define an atom for managing component variants
const componentVariantsAtom = atom({
  key: 'componentVariantsState', 
  default: {
    button: [],
    input: [],
    select: [],
  }, 
});

export default componentVariantsAtom;
