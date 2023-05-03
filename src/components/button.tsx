import React from 'react'
import { Button as MUIButton, ButtonProps } from '@mui/material'

const Button = ({
  title,
  variant = 'contained',
  color = 'info',
  size = 'small',
  onClick,
  sx,
  disabled = false,
}: ButtonProps) => {
  return (
    <MUIButton
      disabled={disabled}
      size={size}
      variant={variant}
      onClick={onClick}
      color={color}
      sx={{ ...sx }}
    >
      {title}
    </MUIButton>
  )
}

export default Button
