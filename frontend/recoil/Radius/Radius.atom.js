import { atom } from "recoil";

// Define an atom for managing radius
const radiusAtom = atom({
  key: "radiusAtom",
  default: [
    { id: 1, isOpen: false, variableName: "Radius 1", radiusValue: 5 },
    { id: 2, isOpen: false, variableName: "Radius 2", radiusValue: 10 },
  ],
});

export default radiusAtom;
