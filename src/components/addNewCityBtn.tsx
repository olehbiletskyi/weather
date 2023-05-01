import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useAppDispatch, useIsOpenControl } from 'hooks'
import { fetchCity } from 'store/citiesSlice/citiesSlice'
import AddNewCityModal from './addNewCityModal'
import CustomTitle from './customTitle'

const AddNewCityBtn = () => {
  const dispatch = useAppDispatch()

  const { isOpen, open, close } = useIsOpenControl()

  const [cityName, setCityName] = useState('')

  const onChangeCityName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value)
  }

  const handleClickNewCityModalOpen = () => {
    open()
  }

  const handleModalClose = () => {
    dispatch(fetchCity({ cityName: cityName.trim() }))
    close()
    setCityName('')
  }

  return (
    <>
      <Button
        variant={'contained'}
        color={'info'}
        sx={{ height: '50px', width: '200px' }}
        onClick={handleClickNewCityModalOpen}
      >
        <AddCircleIcon fontSize={'large'} sx={{ mr: '1rem' }} />
        <Typography variant={'h6'}>Add city</Typography>
      </Button>

      <AddNewCityModal
        text={<CustomTitle />}
        value={cityName}
        onChangeValue={onChangeCityName}
        isOpen={isOpen}
        close={close}
        modalCloseHandler={handleModalClose}
      />
    </>
  )
}

export default AddNewCityBtn
