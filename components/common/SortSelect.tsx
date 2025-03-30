import React from 'react';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Sort } from "@mui/icons-material";
import { Controller, Control } from "react-hook-form";
import { SvgIconComponent } from '@mui/icons-material';

interface SortOption {
  value: string;
  label: string;
  icon: SvgIconComponent;
}

interface SortSelectProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label?: string;
  options: SortOption[];
  defaultValue?: string;
  accentColor?: string;
  minWidth?: number | string;
  onSortChange?: (value: string) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({
  name,
  control,
  label = "排序方式",
  options,
  defaultValue,
  accentColor = "#0ea5e9",
  minWidth = 150,
  onSortChange,
}) => {
  return (
    <FormControl
      size="small"
      sx={{
        minWidth: minWidth,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: accentColor,
          },
        },
      }}
    >
      <InputLabel
        id={`${name}-label`}
        sx={{
          fontSize: "0.9rem",
          color: "text.secondary",
        }}
      >
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || (options.length > 0 ? options[0].value : '')}
        render={({ field }) => (
          <Select
            {...field}
            labelId={`${name}-label`}
            id={name}
            label={label}
            sx={{ fontSize: "0.9rem" }}
            startAdornment={
              <Sort sx={{ fontSize: 18, color: accentColor, mr: 0.5 }} />
            }
            onChange={(e) => {
              field.onChange(e);
              if (onSortChange) {
                onSortChange(e.target.value as string);
              }
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <option.icon
                    sx={{ fontSize: 18, mr: 1, color: accentColor }}
                  />
                  {option.label}
                </Box>
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default SortSelect;