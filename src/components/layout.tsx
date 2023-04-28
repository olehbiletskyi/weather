import React, { FC, ReactNode } from 'react'
import Header from './header'
import { Container } from '@mui/material'

interface IProps {
  children: ReactNode
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container sx={{ backgroundColor: '#fff7e6', marginY: '1.5rem' }} maxWidth={'xl'} disableGutters={true}>
        {children}
      </Container>
    </>
  )
}

export default Layout
