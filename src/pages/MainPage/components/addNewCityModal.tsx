import React from 'react'
import { DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material'
import { Button, Modal } from 'components'

interface IProps {
  title?: string
  description?: string | JSX.Element
  value: string
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void
  isOpen: boolean
  close: () => void
  submitHandler: () => void
  label?: string
}

const AddNewCityModal = ({
  title = 'New location',
  description = 'Please type name of location',
  value,
  onChangeValue,
  isOpen,
  close,
  submitHandler,
  label = 'Name',
}: IProps) => {
  return (
    <Modal title={title} isOpen={isOpen} close={close}>
      <>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
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
          <Button title='Cancel' onClick={close} color='error' variant='text' size='medium' />
          <Button
            title='Find and subscribe'
            onClick={submitHandler}
            color='success'
            size='medium'
            disabled={value.trim().length === 0}
          />
        </DialogActions>
      </>
    </Modal>
  )
}

export default AddNewCityModal
