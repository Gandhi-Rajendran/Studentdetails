import React from "react";
import StudentForm from "./component/StudentForm";

import { Wrapper } from "./component/Styled";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableFocusRipple: true,
        disableRipple: true,
        size: "medium",
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "medium",
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <h2>Student Login Form</h2>
        <StudentForm />
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
