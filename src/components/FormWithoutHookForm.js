import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { Button, Paper } from "@material-ui/core";

const initialValues ={
  userName:""
}

export function FormWithoutHookForm (){
  const [textValue, setTextValue] = useState(initialValues);

  const onTextChange = (e: any) => setTextValue(e.target.value);
  const handleSubmit = () => alert(textValue);
  const handleReset = () => setTextValue(initialValues);

  return (
    <Paper>
      <h2>Form Demo</h2>
      <TextField
        variant="outlined"
        onChange={onTextChange}
        name="userName"
        value={textValue.userName}
        label={"Text Value"} //optional
      />

      <Button onClick={handleSubmit}>Submit</Button>
      <Button onClick={handleReset}>Reset</Button>
    </Paper>
  );
};
