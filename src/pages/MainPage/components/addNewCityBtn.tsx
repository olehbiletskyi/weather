import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useAppDispatch, useAppSelector, useIsOpenControl } from 'hooks'
import { fetchCityAsync, generateError } from 'store/citiesSlice/citiesSlice'
import { allCitiesSelector } from 'store/citiesSelector/citiesSelector'
import AddNewCityModal from './addNewCityModal'
import CustomDescription from './customDescription'

const AddNewCityBtn = () => {
  const dispatch = useAppDispatch()

  const { isOpen, open, close } = useIsOpenControl()

  const { cities } = useAppSelector(allCitiesSelector)

  const [cityName, setCityName] = useState('')

  const onChangeCityName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value)
  }

  const handleSubmit = () => {
    const isHasCityAtStore = cities.some((item) => item.name === cityName.trim())
    if (!isHasCityAtStore) {
      dispatch(fetchCityAsync({ cityName: cityName.trim() }))
      close()
      setCityName('')
    } else {
      dispatch(generateError({ title: 'The city has already been added!' }))
    }
  }

  return (
    <>
      <Button
        variant={'contained'}
        color={'info'}
        sx={{ height: '50px', width: '200px' }}
        onClick={open}
      >
        <AddCircleIcon fontSize={'large'} sx={{ mr: '1rem' }} />
        <Typography variant={'h6'}>Add city</Typography>
      </Button>

      {/* implemented modal below */}
      <AddNewCityModal
        description={<CustomDescription />}
        value={cityName}
        onChangeValue={onChangeCityName}
        isOpen={isOpen}
        close={close}
        submitHandler={handleSubmit}
      />
      {/**/}
    </>
  )
}

export default AddNewCityBtn
