import { FiTrash } from 'react-icons/fi'
import Button from '../Button'
import './styles.scss'

type QuestionModalProps = {
    deleteQuestion: () => void,
    cancelDelete: () => void
}

export default function DeleteQuestion(
    {deleteQuestion, cancelDelete}: QuestionModalProps
) {
    return (
        <div className="overlay">
            <div className="container">
                <FiTrash size={ 50 } color="red" />

                <strong>Excluir pergunta</strong>

                <p>Tem certeza que deseja excluir essa pergunta?</p>

                <div>
                    <Button
                        style={{
                            backgroundColor: '#DBDCDD',
                            color: '#737380',
                            fontSize: '1rem'
                        }}
                        onClick={ cancelDelete }
                    >
                        Cancelar
                    </Button>

                    <Button
                        style={{
                            backgroundColor: '#E73F5D',
                            color: '#FEFEFE',
                            fontSize: '1rem'
                        }}
                        onClick={ deleteQuestion }
                    >
                        Sim, excluir
                    </Button>
                </div>
            </div>
        </div>
    )
}