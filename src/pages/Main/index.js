import { Box } from "@material-ui/core";
import AuthForms from "../../scenes/AuthForms";

function Main() {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <AuthForms />
    </Box>
  );
}

export default Main;
