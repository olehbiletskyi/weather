import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
} from '@mui/material'

interface IProps {
  title?: string
  message?: string
  isOpen: boolean
  handleClose: () => void
}

const ErrorAlertDialog = ({ title = 'Server Error', message, isOpen, handleClose }: IProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle variant={'h6'} sx={{ fontWeight: 700 }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText variant={'body1'}>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ErrorAlertDialog
