import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

import Button from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'
import { useVerifyAuth } from '../../hooks/useVerifyAuth'
import { database } from '../../services/firebase'

import illustrationImg from '../../assets/images/background.svg'
import logoImg from '../../assets/images/logo.svg'
import './styles.scss'

export default function NewRoom() {
    const { user } = useAuth()
    const history = useHistory()
    const [roomName, setRoomName] = useState('')

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()
        if (!roomName.trim()) {
            return
        }
        const roomRef = database.ref('rooms')
        const roomInstance = await roomRef.push({
            title: roomName,
            user: user?.id
        })
        history.push(`/admin/rooms/${ roomInstance.key }`)
    }

    useVerifyAuth()

    return (
        <div id="new-room">
            <aside>
                <img
                    src={ illustrationImg }
                    alt="Ilustração simbolizando perguntas e respostas"
                />

                <strong>Crie salas de Q&A ao-vivo</strong>

                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={ logoImg } alt="let me ask" />

                    { user && (
                        <h3>Olá, { user.name }</h3>
                    )}

                    <h2>
                        Crie uma nova sala
                    </h2>

                    <form onSubmit={ event => handleCreateRoom(event) }>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={ event => setRoomName(event.target.value) }
                            value={ roomName }
                            required
                        />

                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>

                    <p>
                        Quer entrar em uma sala existente? {' '}
                        <Link to="/" >Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}
