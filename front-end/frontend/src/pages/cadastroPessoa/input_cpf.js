import TextField from '@material-ui/core/TextField';
import React from "react";
import InputMask from "react-input-mask";

const InputTelefone = ({value, onChange}) => (
  <InputMask mask="999.999.999-99" value={value} onChange={onChange} >{() => <TextField  label="Cpf" defaultValue="cpf" variant="outlined"/>}</InputMask>
);

export default InputTelefone;