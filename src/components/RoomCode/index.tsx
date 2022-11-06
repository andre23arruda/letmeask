import { FiCopy } from 'react-icons/fi'
import toast from 'react-hot-toast'

import './styles.scss'

type RoomCodeProps = {
    code: string
}

export default function RoomCode({ code }: RoomCodeProps) {
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(code)
        toast.success('Room code is in clipboard!')
    }

    return (
        <button
            className="room-code"
            onClick={ copyRoomCodeToClipboard }
        >
            <div>
                <FiCopy size={18} color="white" />
            </div>

            <span>Sala #{ code }</span>
        </button>
    )
}
