import { Box, Grid, Stack, TextField } from "@mui/material";

const Components = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              label="Variable name"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Enter HEX Code"
              variant="outlined"
            />
          </Stack>
        </Grid>
      </Grid>
      <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}/>
    </div>
  );
};

export default Components;
