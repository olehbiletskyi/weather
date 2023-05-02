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

const ErrorAlertDialog = ({ title = 'Error:', message = 'City not found or an error occurred!', isOpen, handleClose }: IProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle variant={'h5'} sx={{ fontWeight: 500 }} >
        {title}
      </DialogTitle>
      <DialogContent sx={{ minWidth: '420px' }}>
        <DialogContentText variant={'h5'} color={'error'}>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ErrorAlertDialog
