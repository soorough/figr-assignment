import { Box, ListSubheader } from "@mui/material";
import ButtonComponent from "../HandleComponents/ButtonComponent";
import InputComponent from "../HandleComponents/InputComponent";
import SelectComponent from "../HandleComponents/SelectComponent";

const Components = () => {
  return (
    <Box display="flex">
      {/* Main component section */}
      <Box flex="1" p={4}>
        <ListSubheader sx={{ fontWeight: "bold", fontSize: "20px" }}>
          Components
        </ListSubheader>

        <ButtonComponent />
        <InputComponent />
        <SelectComponent />
      </Box>
    </Box>
  );
};

export default Components;
