import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store/store'

// типизация useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()