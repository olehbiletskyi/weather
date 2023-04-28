import React, { FC, ReactNode, Suspense } from 'react'
import Header from './header'
import { Container } from '@mui/material'
import AnimatePageWrapper from './animatePageWrapper'

interface IProps {
  children: ReactNode
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <>
      <AnimatePageWrapper>
        <Suspense fallback={<>Loading...</>}>
          <Header />
          <Container sx={{ backgroundColor: '#fff7e6', marginY: '1.5rem' }} maxWidth={'xl'} disableGutters={true}>
            {children}
          </Container>
        </Suspense>
      </AnimatePageWrapper>
    </>
  )
}

export default Layout
