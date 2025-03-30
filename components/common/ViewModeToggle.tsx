import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { ViewModule, ViewList } from "@mui/icons-material";
import { Control, Controller } from "react-hook-form";

export type ViewMode = "grid" | "list";

interface ViewOption {
  value: ViewMode;
  icon: React.ReactNode;
  ariaLabel: string;
  position: "left" | "right" | "middle";
}

interface ViewModeToggleProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  accentColor?: string;
  accentColorLight?: string;
  defaultOptions?: boolean;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  name,
  control,
  accentColor = "#0ea5e9",
  accentColorLight = "#e0f2fe",
  defaultOptions = true,
}) => {
  const defaultViewOptions: ViewOption[] = [
    {
      value: "grid",
      icon: <ViewModule />,
      ariaLabel: "grid view",
      position: "left",
    },
    {
      value: "list",
      icon: <ViewList />,
      ariaLabel: "list view",
      position: "right",
    },
  ];

  // Get border radius based on position
  const getBorderRadius = (position: string): string => {
    switch (position) {
      case "left":
        return "8px 0 0 8px";
      case "right":
        return "0 8px 8px 0";
      case "middle":
        return "0";
      default:
        return "0";
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ToggleButtonGroup
          value={field.value}
          exclusive
          onChange={(_, newValue) => {
            if (newValue !== null) {
              field.onChange(newValue);
            }
          }}
          aria-label="view mode"
          sx={{
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            "& .MuiToggleButton-root": {
              border: "1px solid rgba(0,0,0,0.08)",
              "&.Mui-selected": {
                backgroundColor: accentColorLight,
                color: accentColor,
                "&:hover": {
                  backgroundColor: accentColorLight,
                },
              },
            },
          }}
        >
          {defaultOptions &&
            defaultViewOptions.map((option) => (
              <ToggleButton
                key={option.value}
                value={option.value}
                aria-label={option.ariaLabel}
                sx={{ borderRadius: getBorderRadius(option.position) }}
              >
                {option.icon}
              </ToggleButton>
            ))}
        </ToggleButtonGroup>
      )}
    />
  );
};

export default ViewModeToggle;
