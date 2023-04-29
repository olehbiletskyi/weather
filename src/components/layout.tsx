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
      <Suspense fallback={<>Loading...</>}>
        <Header />
        <AnimatePageWrapper>
          <Container sx={{ backgroundColor: '#fff7e6' }} maxWidth={'xl'} disableGutters={true}>
            {children}
          </Container>
        </AnimatePageWrapper>
      </Suspense>
    </>
  )
}

export default Layout
