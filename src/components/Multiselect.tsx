import React from "react";
import { TextField, Autocomplete, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const amenities = [
  'swimming pool',
  'garage',
  'gym'
]

const MultiSelect = () => {
  return (
    <Autocomplete
      sx={{ width: '100%' }}
      multiple
      options={amenities}
      getOptionLabel={(option) => option}
      disableCloseOnSelect
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          // label="Multiple Autocomplete"
          // placeholder="Multiple Autocomplete"
        />
      )}
      renderOption={(props, option, { selected }) => (
        <MenuItem
          {...props}
          key={option}
          value={option}
          sx={{ justifyContent: "space-between" }}
        >
          {option}
          {selected ? <CheckIcon color="info" /> : null}
        </MenuItem>
      )}
    />
  )
}

export default MultiSelect