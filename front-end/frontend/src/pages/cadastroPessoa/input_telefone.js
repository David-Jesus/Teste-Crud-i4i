import TextField from '@material-ui/core/TextField';
import React from "react";
import InputMask from "react-input-mask";

const Input = ({value, onChange}) => (
  <InputMask mask="(99)9 9999-9999" value={value} onChange={onChange} >{() => <TextField  label="Cpf" defaultValue="cpf" variant="outlined"/>}</InputMask>
);

export default Input;