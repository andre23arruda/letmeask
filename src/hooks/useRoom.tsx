import { useEffect, useState } from 'react'
import { database } from '../services/firebase'
import { useAuth } from './useAuth'

type Question = {
    id: string,
    user: {
        name: string,
        avatar: string,
    },
    content: string,
    isHighlighted: boolean,
    isAnswered: boolean,
    likeCount: number,
    likeId: string | undefined,
}

type Questions = Record<string, {
    user: {
        name: string,
        avatar: string,
    },
    content: string,
    isHighlighted: boolean,
    isAnswered: boolean,
    likes: Record<string, {
        userId: string
    }>,
}>

export function useRoom(roomId: string) {
    const { user } = useAuth()
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const roomRef = database.ref(`rooms/${ roomId }`)
        roomRef.on('value', room => {
            const roomInfo = room.val()
            const questions: Questions  = roomInfo.questions ?? {}
            const questionsArray = Object.entries(questions).map(([key, question]) => {
                return {
                    id: key,
                    ...question,
                    likeCount: Object.values(question.likes ?? {}).length,
                    likeId: Object.entries(question.likes ?? {}).find(([key, like]) => like.userId === user?.id)?.[0]
                }
            })
            setQuestions(questionsArray)
            setTitle(roomInfo.title)
        })

        return () => {
            roomRef.off('value')
        }
    }, [roomId, user?.id])



    return { questions, title }
}
