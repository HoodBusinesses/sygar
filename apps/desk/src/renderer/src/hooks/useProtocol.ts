import { useAppDispatch } from '@renderer/store/hooks'
import { setToken } from '@renderer/store/slices/auth.slice'
import { useCallback, useEffect } from 'react'

export const useProtocol = () => {
  const dispatch = useAppDispatch()

  const storeToken = useCallback(
    (token: string) => {
      console.log('token is fired for store ' + token)
      dispatch(setToken(token))
      localStorage.setItem('token', token)
    },
    [dispatch]
  )

  const onTokenRecieved = (receivedToken: string) => {
    console.log('token is recieved: ' + receivedToken)
    storeToken(receivedToken)
  }

  useEffect(() => {
    if (window.electron) {
      console.log('event on listen')
      window.electron.onTokenReceived(onTokenRecieved)
    } else {
      console.error('Electron API is not available')
    }

    return () => {
      console.log('event cleaned')
      window.electron?.removeTokenListeners()
    }
  }, [window.electron, window.electron.onTokenReceived, window.electron.removeTokenListeners])
}
