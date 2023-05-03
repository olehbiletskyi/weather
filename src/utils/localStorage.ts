const appLocalStorageKey = 'CurrentWeather'

//
const getCitiesFromLocalStorage = (key: string): Array<string> => {
  const returnedData = localStorage.getItem(appLocalStorageKey + key)
  if (returnedData) {
    return JSON.parse(returnedData)
  } else {
    return []
  }
}

//
const addCityToLocalStorage = (key: string, value: string): void => {
  if (typeof value !== 'string') return
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
  if (value === '') return

  const foundedData = localStorage.getItem(appLocalStorageKey + key)
  if (foundedData) {
    const parsedData = JSON.parse(foundedData)
    const filteredData = parsedData.filter((item: string) => item !== value)
    localStorage.setItem(appLocalStorageKey + key, JSON.stringify(filteredData))
  }
}

export { getCitiesFromLocalStorage, addCityToLocalStorage, deleteCityFromLocalStorage }
