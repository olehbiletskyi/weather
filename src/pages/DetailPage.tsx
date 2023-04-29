import React, { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { useAppSelector } from 'hooks'
import { cityByIdSelector } from 'store/citiesSelector/citiesSelector'

const DetailPage: FC = () => {
  const [searchParams] = useSearchParams()

  const cityIdFromSearchParams = searchParams.get('cityId') || ''

  const city = useAppSelector(cityByIdSelector(cityIdFromSearchParams))

  return (
    <Box component='main' sx={{ p: 3 }}>
      <Typography variant='h6' component='div'>
        Detail page : {city?.name}
      </Typography>
      <Typography variant='h6' component='div'>
        ID: {cityIdFromSearchParams}
      </Typography>
      <Typography variant='h6' component='div'>
        {city?.coord?.lat} / {city?.coord?.lon}
      </Typography>
    </Box>
  )
}

export default DetailPage
