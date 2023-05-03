const localStorageMock = (function () {
    
  let storage: any = {}

  return {
    getItem(key: string) {
      return storage[key]
    },
    setItem(key: string, value: string) {
      storage[key] = value
    },
    removeItem(key: string) {
      delete storage[key]
    },
    clear() {
      storage = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

const appLocalStorageKey = 'CurrentWeather'
const getCitiesFromLocalStorage = (key: string): Array<string> => {
  const returnedData = window.localStorage.getItem(appLocalStorageKey + key)
  if(returnedData) {
    return JSON.parse(returnedData)
  } else {
    return []
  }
}
const addCityToLocalStorage = (key: string, value: any): void => {
  if(typeof value !== 'string') return
  const foundedData = window.localStorage.getItem(appLocalStorageKey + key)

  if (foundedData) {
    const parsedData = JSON.parse(foundedData)
    if (!parsedData.includes(value)) {
      parsedData.push(value)
      window.localStorage.setItem(appLocalStorageKey + key, JSON.stringify(parsedData))
    }
  } else {
    window.localStorage.setItem(appLocalStorageKey + key, JSON.stringify([value]))
  }
}
const deleteCityFromLocalStorage = (key: string, value: any): void => {
  if (value === '') return

  const foundedData = window.localStorage.getItem(appLocalStorageKey + key)
  if (foundedData) {
    const parsedData = JSON.parse(foundedData)
    const filteredData = parsedData.filter((item: string) => item !== value)
    window.localStorage.setItem(appLocalStorageKey + key, JSON.stringify(filteredData))
  }
}

describe('testing local storage methods', () => {

  beforeEach(() => {
    window.localStorage.clear()
  })

  test('get all value from local storage', () => {
    const mockValue1 = 'BBB'
    const mockValue2 = 'CCC'
    const mockValue3 = 'DDD'
    addCityToLocalStorage('Cities', mockValue1)
    addCityToLocalStorage('Cities', mockValue2)
    addCityToLocalStorage('Cities', mockValue3)
    getCitiesFromLocalStorage('Cities')
    const mockJson = ['BBB', 'CCC', 'DDD']
    expect(window.localStorage.getItem(appLocalStorageKey + 'Cities')).toEqual(JSON.stringify(mockJson))
  })

  test('value is added into EMPTY local storage', () => {
    const mockValue = 'AAA'
    addCityToLocalStorage('Cities', mockValue)
    const mockJson = ['AAA']
    expect(window.localStorage.getItem(appLocalStorageKey + 'Cities')).toEqual(JSON.stringify(mockJson))
  })

  test('value is added into NOT EMPTY local storage', () => {
    const mockValue1 = 'XXX'
    const mockValue2 = 'YYY'
    addCityToLocalStorage('Cities', mockValue1)
    addCityToLocalStorage('Cities', mockValue2)
    const mockJson = ['XXX', 'YYY']
    expect(window.localStorage.getItem(appLocalStorageKey + 'Cities')).toEqual(JSON.stringify(mockJson))
  })

  test('value is added into NOT EMPTY local storage with wrong value', () => {
    const mockValue1 = '123'
    const mockValue2 = { a: 1 }
    addCityToLocalStorage('Cities', mockValue1)
    addCityToLocalStorage('Cities', mockValue2)
    const mockJson = ['123']
    expect(window.localStorage.getItem(appLocalStorageKey + 'Cities')).toEqual(JSON.stringify(mockJson))
  })

  test('value is added into NOT EMPTY local storage where it is already', () => {
    const mockValue1 = '111'
    const mockValue2 = '222'
    addCityToLocalStorage('Cities', mockValue1)
    addCityToLocalStorage('Cities', mockValue2)
    addCityToLocalStorage('Cities', mockValue2)
    const mockJson = ['111', '222']
    expect(window.localStorage.getItem(appLocalStorageKey + 'Cities')).toEqual(JSON.stringify(mockJson))
  })

  test('deleting single value from local storage', () => {
    const mockValue1 = 'FFF'
    const mockValue2 = 'EEE'
    const mockValue3 = 'GGG'
    addCityToLocalStorage('Cities', mockValue1)
    addCityToLocalStorage('Cities', mockValue2)
    addCityToLocalStorage('Cities', mockValue3)
    deleteCityFromLocalStorage('Cities', 'EEE')
    const mockJson = ['FFF', 'GGG']
    expect(window.localStorage.getItem(appLocalStorageKey + 'Cities')).toEqual(JSON.stringify(mockJson))
  })

  test('deleting single value from local storage with wrong value', () => {
    const mockValue1 = '7'
    const mockValue2 = '8'
    const mockValue3 = '9'
    const mockValue4 = 8
    const mockValue5 = 9
    const mockValue6 = ''
    addCityToLocalStorage('Cities', mockValue1)
    addCityToLocalStorage('Cities', mockValue2)
    addCityToLocalStorage('Cities', mockValue3)
    deleteCityFromLocalStorage('Cities', mockValue4)
    deleteCityFromLocalStorage('Cities', mockValue5)
    deleteCityFromLocalStorage('Cities', mockValue6)
    const mockJson = ['7', '8', '9']
    expect(window.localStorage.getItem(appLocalStorageKey + 'Cities')).toEqual(JSON.stringify(mockJson))
  })

})