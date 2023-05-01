import React, { FC, ReactNode } from 'react'
import Header from './header'
import { Container } from '@mui/material'
import AnimatePageWrapper from './animatePageWrapper'

interface IProps {
  children: ReactNode
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />
      <AnimatePageWrapper>
        <Container maxWidth={'xl'} disableGutters={true}>
          {children}
        </Container>
      </AnimatePageWrapper>
    </>
  )
}

export default Layout
