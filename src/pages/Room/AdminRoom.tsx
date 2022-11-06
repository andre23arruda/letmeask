import { useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import cn from 'classnames'
import toast from 'react-hot-toast'
import { RiCheckboxCircleLine } from 'react-icons/ri'
import { FiMessageSquare, FiTrash } from 'react-icons/fi'

import logoImg from '../../assets/images/logo.svg'
import chatImg from '../../assets/images/chat.svg'

import Button from '../../components/Button'
import Question from '../../components/Question'
import { CloseRoom, DeleteQuestion } from '../../components/Modal'
import RoomCode from '../../components/RoomCode'

import { useAuth } from '../../hooks/useAuth'
import { useRoom } from '../../hooks/useRoom'
import { database } from '../../services/firebase'

import './styles.scss'

type RoomParams = {
    id: string
}

export default function AdminRoom() {
    const { user } = useAuth()
    const history = useHistory()
    const [closeRoomId, setCloseRoomId] = useState('')
    const [deleteQuestionId, setDeleteQuestionId] = useState('')
    const params = useParams<RoomParams>()
    const roomId = params.id
    const { title, questions } = useRoom(roomId)

    async function deleteQuestion(questionId: string) {
        try {
            await database.ref(`rooms/${ roomId }/questions/${ questionId }`).remove()
            setDeleteQuestionId('')
            toast.success('Question deleted!')
        } catch {
            toast.error("You can't delete this question!")
        }
    }

    async function closeRoom() {
        try {
            await database.ref(`rooms/${ roomId }`).update({
                closedAt: new Date()
            })
            history.push('/')
            toast.success('Room closed!')
        } catch {
            toast.error("You can't close this room!")
        }
    }

    async function handleHighlightQuestion(questionId: string) {
        await database
            .ref(`rooms/${ roomId }/questions/${ questionId }`).update({
                isHighlighted: true
            })
    }

    async function handleAnswerQuestion(questionId: string) {
        await database
            .ref(`rooms/${ roomId }/questions/${ questionId }`).update({
                isAnswered: true
            })
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <Link to="/">
                        <img src={ logoImg } alt="Letmeask" />
                    </Link>

                    <div>
                        <RoomCode code={ roomId } />

                        <Button onClick={() => setCloseRoomId(roomId)}>
                            Encerrar sala
                        </Button>
                    </div>

                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala { title }</h1>

                    { questions.length > 0 && (
                        <span>{ questions.length } pergunta(s)</span>
                    )}
                </div>

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
                                { question.isAnswered || (
                                    <>
                                        <button
                                            className={cn(
                                                'action-button',
                                                { answered: question.isAnswered }
                                            )}
                                            type="button"
                                            title="Marcar como respondido"
                                            aria-label="Marcar como respondido"
                                            onClick={() => handleAnswerQuestion(question.id) }
                                            >
                                            <RiCheckboxCircleLine size={19} />
                                        </button>

                                        <button
                                            className={cn(
                                                'action-button',
                                                { highlighted: (question.isHighlighted && !question.isAnswered) }
                                            )}
                                            type="button"
                                            title="Destacar pergunta"
                                            aria-label="Destacar pergunta"
                                            onClick={() => handleHighlightQuestion(question.id) }
                                        >
                                            <FiMessageSquare size={18} />
                                        </button>
                                    </>
                                )}

                                <button
                                    className="action-button"
                                    type="button"
                                    title="Excluir pergunta"
                                    aria-label="Excluir pergunta"
                                    onClick={() => setDeleteQuestionId(question.id)}
                                >
                                    <FiTrash size={18} />
                                </button>
                            </Question>
                        )
                    })}
                </div>

                { !questions.length && (
                    <div className="no-messages">
                        <img src={ chatImg } alt="Balões de chat" />

                        <h3>Nenhuma pergunta por aqui...</h3>

                        <p>
                            Envie o código desta sala para seus amigos e comece a responder perguntas!
                        </p>
                    </div>
                )}
            </main>

            { closeRoomId && (
                <CloseRoom
                    closeRoom={() => closeRoom()}
                    cancelClose={() => setCloseRoomId('')}
                />
            )}

            { deleteQuestionId && (
                <DeleteQuestion
                    deleteQuestion={() => deleteQuestion(deleteQuestionId)}
                    cancelDelete={() => setDeleteQuestionId('')}
                />
            )}
        </div>
    )
}
