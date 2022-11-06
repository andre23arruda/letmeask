import { VscError } from 'react-icons/vsc'
import Button from '../Button'
import './styles.scss'

type QuestionModalProps = {
    closeRoom: () => void,
    cancelClose: () => void
}

export default function CloseRoom(
    {closeRoom, cancelClose}: QuestionModalProps
) {
    return (
        <div className="overlay">
            <div className="container">
                <VscError size={ 50 } color="red" />

                <strong>Encerrar sala</strong>

                <p>Tem certeza que deseja encerrar essa sala?</p>

                <div>
                    <Button
                        style={{
                            backgroundColor: '#DBDCDD',
                            color: '#737380',
                            fontSize: '1rem'
                        }}
                        onClick={ cancelClose }
                    >
                        Cancelar
                    </Button>

                    <Button
                        style={{
                            backgroundColor: '#E73F5D',
                            color: '#FEFEFE',
                            fontSize: '1rem'
                        }}
                        onClick={ closeRoom }
                    >
                        Sim, encerrar
                    </Button>
                </div>
            </div>
        </div>
    )
}