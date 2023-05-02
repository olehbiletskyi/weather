import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'

interface IProps {
  title?: string
  text?: string | JSX.Element
  value: string
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void
  isOpen: boolean
  close: () => void
  modalCloseHandler: () => void
  label?: string
}

const AddNewCityModal = ({
  title = 'New location',
  text = 'Please type name of location',
  value,
  onChangeValue,
  isOpen,
  close,
  modalCloseHandler,
  label = 'Name',
}: IProps) => {
  return (
    <>
      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
          <TextField
            value={value}
            autoFocus
            margin='dense'
            id='name'
            label={label}
            type='text'
            fullWidth
            variant='outlined'
            onChange={onChangeValue}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', paddingX: '18px' }}>
          <Button onClick={close} color={'error'}>
            Cancel
          </Button>
          <Button onClick={modalCloseHandler} variant={'contained'} color={'success'}>
            Find and subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddNewCityModal
