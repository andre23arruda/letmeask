import { FormEvent, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import cn from 'classnames'
import toast from 'react-hot-toast'
import { FiThumbsUp } from 'react-icons/fi'

import logoImg from '../../assets/images/logo.svg'
import chatImg from '../../assets/images/chat.svg'

import Button from '../../components/Button'
import Question from '../../components/Question'
import RoomCode from '../../components/RoomCode'
import { useAuth } from '../../hooks/useAuth'
import { useRoom } from '../../hooks/useRoom'
import { database } from '../../services/firebase'

import './styles.scss'

type RoomParams = {
    id: string
}

export default function Room() {
    const { user, signinWithGoogle } = useAuth()
    const [newQuestion, setNewQuestion] = useState('')
    const params = useParams<RoomParams>()
    const roomId = params.id
    const { title, questions } = useRoom(roomId)

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()
        if (newQuestion.trim() === '') {
            return
        }
        if (!user) {
            toast.error('You must be logged in')
            throw new Error('You must be logged in')
        }
        const question = {
            content: newQuestion,
            user: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false,
        }
        await database
            .ref(`rooms/${ roomId }/questions`)
            .push(question)
        toast.success('Question sent successfully!')
        setNewQuestion('')
    }

    async function handleLikeQuestion(
        questionId: string,
        likeId: string | undefined
    ) {
        if (likeId) { // dislike
            await database
                .ref(`rooms/${ roomId }/questions/${ questionId }/likes/${ likeId }`)
                .remove()
        } else { // like
            await database
                .ref(`rooms/${ roomId }/questions/${ questionId }/likes`)
                .push({
                    userId: user?.id,
                })
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <Link to="/">
                        <img src={ logoImg } alt="Letmeask" />
                    </Link>

                    <RoomCode code={ roomId } />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala { title }</h1>

                    { questions.length > 0 && (
                        <span>{ questions.length } pergunta(s)</span>
                    )}
                </div>

                <form onSubmit={ handleSendQuestion }>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={ event => setNewQuestion(event.target.value) }
                        value={ newQuestion }
                    />

                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img
                                    src={ user.avatar }
                                    alt={ user.name }
                                    referrerPolicy="no-referrer"
                                />

                                <span>{ user.name }</span>
                            </div>
                        ) : (
                            <span>
                                Para enviar uma pergunta,{' '}

                                <button onClick={ signinWithGoogle }>
                                    faça seu login
                                </button>
                            </span>
                        )}

                        <Button
                            type="submit"
                            disabled={ !user }
                        >
                            Enviar pergunta
                        </Button>
                    </div>
                </form>

                <div className="question-list">
                    { questions.map(question => {
                        return (
                            <Question
                                key={ question.id }
                                content={ question.content }
                                user={ question.user }
                                isAnswered={ question.isAnswered }
                                isHighlighted={ question.isHighlighted }
                            >
                                {!question.isAnswered && (
                                    <button
                                        className={cn(
                                            'action-button',
                                            { liked: question.likeId }
                                        )}
                                        type="button"
                                        aria-label="Marcar como gostei"
                                        onClick={() =>
                                            handleLikeQuestion(
                                                question.id,
                                                question.likeId
                                            )
                                        }
                                    >
                                        { question.likeCount > 0 && (
                                            <span>{ question.likeCount }</span>
                                        )}

                                        <FiThumbsUp size={ 18 } />
                                    </button>
                                )}
                            </Question>
                        )
                    })}
                </div>

                { !questions.length && (
                    <div className="no-messages">
                        <img src={ chatImg } alt="Balões de chat" />

                        <h3>Nenhuma pergunta por aqui...</h3>

                        <p>
                            Seja a primeira pessoa a fazer uma pergunta!
                        </p>
                    </div>
                )}
            </main>
        </div>
    )
}
