import { Dialog, DialogTitle } from '@mui/material'

interface IProps {
  isOpen: boolean
  close?: () => void
  title: string
  children: JSX.Element
}

const Modal = ({ isOpen, close, title, children }: IProps) => {
  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  )
}

export default Modal
