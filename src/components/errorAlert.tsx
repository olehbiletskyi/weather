import React from 'react'
import {
  Button,
  DialogActions,
  DialogContentText,
  DialogContent,
} from '@mui/material'
import Modal from './modal'

interface IProps {
  title?: string
  message?: string
  isOpen: boolean
  handleClose: () => void
}

const ErrorAlert = ({
  title = 'Error:',
  message = 'City not found or an error occurred!',
  isOpen,
  handleClose,
}: IProps) => {
  return (
    <Modal isOpen={isOpen} title={title}>
      <>
        <DialogContent sx={{ minWidth: '420px' }}>
          <DialogContentText variant={'h5'} color={'error'}>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </>
    </Modal>
  )
}

export default ErrorAlert
