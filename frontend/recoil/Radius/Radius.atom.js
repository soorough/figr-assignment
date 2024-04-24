import { atom } from "recoil";

// Define an atom for managing radius
const radiusAtom = atom({
  key: "radiusAtom",
  default: [
    { id: 1, isOpen: false, variableName: "Primary", radiusValue: 5 },
    { id: 2, isOpen: false, variableName: "Secondary", radiusValue: 10 },
  ],
});

export default radiusAtom;
