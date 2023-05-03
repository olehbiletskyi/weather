import { useDispatch } from 'react-redux'
import type { AppDispatch } from 'store/store'

// use instead of `useDispatch`
export const useAppDispatch: () => AppDispatch = useDispatch
