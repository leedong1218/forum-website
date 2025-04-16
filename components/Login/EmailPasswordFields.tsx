// components/Login/EmailPasswordFields.tsx
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { VpnKeyOutlined, PersonOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { LoginFormInputs } from "./LoginForm";

interface Props {
  register: UseFormRegister<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
}

export default function EmailPasswordFields({ register, errors }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <TextField
        fullWidth
        label="帳號"
        margin="normal"
        sx={{ mb: 2 }}
        placeholder="請輸入 e-mail"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutline />
            </InputAdornment>
          ),
        }}
        {...register("email", { required: "帳號是必填的" })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        fullWidth
        label="密碼"
        placeholder="請輸入密碼"
        type={showPassword ? "text" : "password"}
        margin="normal"
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <VpnKeyOutlined />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
                onClick={() => setShowPassword(!showPassword)} 
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...register("password", { required: "密碼是必填的" })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
    </>
  );
}