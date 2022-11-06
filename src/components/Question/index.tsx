import { ReactNode } from 'react'
import cn from 'classnames'

import './styles.scss'

type QuestionProps = {
    content: string
    user: {
        name: string
        avatar: string
    }
    children?: ReactNode
    isAnswered?: boolean
    isHighlighted?: boolean
}

export default function Question({
    content,
    user,
    isAnswered = false,
    isHighlighted = false,
    children,
}: QuestionProps) {
    return (
        <div
            className={cn(
                'question',
                { answered: isAnswered },
                { highlighted: (isHighlighted && !isAnswered) }
            )}
        >
            <p>{ content }</p>

            <footer>
                <div className="user-info">
                    <img src={ user.avatar } alt={ user.name } referrerPolicy="no-referrer"/>

                    <span>{ user.name }</span>
                </div>

                <div>{ children }</div>
            </footer>
        </div>
    )
}
