import { useHistory } from 'react-router-dom'
import { useAuth } from './useAuth'

export function useVerifyAuth() {
    const { user } = useAuth()
    const history = useHistory()
    if (!user) {
        history.push('/')
    }
}
