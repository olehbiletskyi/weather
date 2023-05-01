const appLocalStorageKey = 'CurrentWeather'

//
const getCitiesFromLocalStorage = (key: string): Array<string> => {
  const returnedData = localStorage.getItem(appLocalStorageKey + key)
  console.log('returnedData:', returnedData) // todo

  return returnedData ? JSON.parse(returnedData) : []
}

//
const addCityToLocalStorage = (key: string, value: string): void => {
  const foundedData = localStorage.getItem(appLocalStorageKey + key)

  if (foundedData) {
    const parsedData = JSON.parse(foundedData)
    if (!parsedData.includes(value)) {
      parsedData.push(value)
      localStorage.setItem(appLocalStorageKey + key, JSON.stringify(parsedData))
    }
  } else {
    localStorage.setItem(appLocalStorageKey + key, JSON.stringify([value]))
  }
}

//
const deleteCityFromLocalStorage = (key: string, value: string): void => {
  console.log('value', value)
  if (value === '') return

  const foundedData = localStorage.getItem(appLocalStorageKey + key)
  if (foundedData) {
    const parsedData = JSON.parse(foundedData)
    const filteredData = parsedData.filter((item: string) => item !== value)
    localStorage.setItem(appLocalStorageKey + key, JSON.stringify(filteredData))
  }
}

export { getCitiesFromLocalStorage, addCityToLocalStorage, deleteCityFromLocalStorage }
