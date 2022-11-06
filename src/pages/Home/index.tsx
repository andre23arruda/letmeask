import { useState, FormEvent } from 'react'
import { useHistory } from 'react-router'
import toast from 'react-hot-toast'
import { FiLogIn } from 'react-icons/fi'
import { FaGoogle } from 'react-icons/fa'

import Button from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'

import illustrationImg from '../../assets/images/background.svg'
import logoImg from '../../assets/images/logo.svg'
import './styles.scss'


export default function Home() {
    const { user, signinWithGoogle } = useAuth()
    const history = useHistory()

    const [roomKey, setRoomKey] = useState('')

    async function login() {
        if (!user)
            await signinWithGoogle()
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()
        if (roomKey.trim() === '') {
            return
        }
        const roomRef = await database.ref(`rooms/${ roomKey }`).get()
        if (!roomRef.exists()) {
            toast.error('Room does not exist.')
            return
        }
        if (roomRef.val().closedAt) {
            toast.error('Room already closed.')
            return
        }
        history.push(`/rooms/${ roomKey }`)
        // history.push(`/admin/rooms/${ roomKey }`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img
                    src={ illustrationImg }
                    alt="Ilustração simbolizando perguntas e respostas"
                />

                <strong>Toda pergunta tem uma resposta</strong>

                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={ logoImg } alt="let me ask" />

                    <button className="create-room" onClick={ login }>
                        <FaGoogle size={ 20 } color="white" />
                        Crie sua sala com o Google
                    </button>

                    <div className="separator">ou entre em uma sala</div>

                    <form onSubmit={ handleJoinRoom }>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={ event => setRoomKey(event.target.value) }
                            value={ roomKey }
                            required
                        />

                        <Button type="submit">
                            <FiLogIn size={ 20 } color="white" />
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
