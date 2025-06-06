import { Button } from "@mui/material";
import { useState } from "react";

function Boton() {
  const [stateButton, setStateButton] = useState("none");

  return (
    <>
      <div>
        <Button
          onClick={() => {
            if (stateButton === "none") {
              setStateButton("block");
            } else {
              setStateButton("none");
            }
          }}
        >
          <h2>TOCA AQUI</h2>
        </Button>

        <h1 style={{ display: stateButton }}>Titulo para probar</h1>
      </div>
    </>
  );
}

export default Boton;
