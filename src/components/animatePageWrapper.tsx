import { motion, AnimationProps } from 'framer-motion'
import { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface AnimationPageProps extends AnimationProps {
  children: ReactNode | JSX.Element
}

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
}

const pageTransition = {
  type: 'tween',
  ease: 'linear',
  duration: 0.5,
}

const AnimatePageWrapper: FC<AnimationPageProps> = ({ children }) => {
  const { pathname } = useLocation()

  return (
    <motion.div
      key={pathname}
      initial='initial'
      animate='in'
      variants={pageVariants}
      transition={pageTransition}
      exit='out'
    >
      {children}
    </motion.div>
  )
}

export default AnimatePageWrapper
