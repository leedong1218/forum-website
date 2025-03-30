import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Search } from "@mui/icons-material";
import { UseFormRegister } from "react-hook-form";
import { ResponsiveStyleValue } from "@mui/system";

interface SearchBarProps {
  placeholder?: string;
  registerName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  onSearch: () => void;
  ariaLabel?: string;
  width?: ResponsiveStyleValue<number | string>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "搜尋...",
  registerName,
  register,
  onSearch,
  ariaLabel = "搜尋",
  width = { xs: "100%", md: 300 },
}) => {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: width,
        borderRadius: 3,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ "aria-label": ariaLabel }}
        {...register(registerName)}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={onSearch}
      >
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
