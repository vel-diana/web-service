import { useState } from 'react'
import TickIcon from "./TickIcon";
import Modal from "./Modal"
import ProgressBar from "./ProgressBar";


const ListItem = ({task, getData}) => {
    const [showModal, setShowModal] = useState(false)

    const deleteItem = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/projects/${task.id}`, {
                method: 'DELETE'
            })
            if (response.status === 200){
                getData()
            }
        } catch (err) {
            console.error(err)
        }
    }

    console.log(task.progress);
    return (
        <li className= "list-item">
            <div className="info-container">
                <TickIcon></TickIcon>
                <p className="task-title">{task.title}</p>
                <ProgressBar progress={task.progress}/>
            </div>
            <div className="button-container">
                <button className="edit" onClick={() => setShowModal(true)}>Изменить</button>
                <button className="delete" onClick={deleteItem}>Удалить</button>

            </div>
            {showModal && <Modal mode={'Изменить'} setShowModal={setShowModal} getData={getData} task={task}/>}
        </li>
    );
}

export default ListItem