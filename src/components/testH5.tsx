import { Typography } from '@mui/material'

const TestH5 = ({ children }: { children: (string | number | JSX.Element)[] }) => {
  return (
    <Typography variant='h5' component='div'>
      {children}
    </Typography>
  )
}

export default TestH5
