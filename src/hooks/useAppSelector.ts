import { useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState } from 'store/store'

// use instead of `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
