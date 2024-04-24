import { atom } from "recoil";

// Define an atom for managing spacing
const spacingAtom = atom({
  key: "spacingAtom",
  default: [
    {
      id: 1,
      isOpen: false,
      variableName: "Spacing 1",
      pxValue: 16,
      remValue: 1,
    },
    {
      id: 2,
      isOpen: false,
      variableName: "Spacing 2",
      pxValue: 24,
      remValue: 1.5,
    },
  ],
});

export default spacingAtom;
