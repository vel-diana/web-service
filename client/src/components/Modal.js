import {useState} from 'react'
import {useCookies} from "react-cookie"

const Modal = ({mode, setShowModal, getData, task}) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const editMode = mode === 'Изменить' ? true : false
    const [data, setData] = useState({
        user_email: editMode ? task.user_email : cookies.Email,
        title: editMode ? task.title : "",
        progress: editMode ? task.progress : 50,
        date: editMode ? task.date : new Date(),
        note: editMode ? task.note : ""

    })

    const postData = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/projects`, {
                method: "POST",
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify(data)
            })
            if (response.status === 200) {
                console.log('Работает')
                setShowModal(false)
                getData()
            }
        } catch (err) {
            console.error(err)
        }
    }

    const editData = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/projects/${task.id}`, {
                method: "PUT",
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify(data)
            })
            if (response.status === 200) {
                setShowModal(false)
                getData()
            }
        } catch (err) {
            console.error(err)
        }
    }


    const handleChange = (e) => {
        const {name, value} = e.target

        setData(data => ({
            ...data,
            [name] : value
        }))

        console.log(data)
    }

    return (
        <div className="overlay">
            <div className="modal">
                <div className="form-title-container">
                    <h3>{mode} проект</h3>
                    <button onClick={() => setShowModal(false)}>X</button>
                </div>

                <form>
                    <input
                        required
                        maxLength={30}
                        placeholder={"Название проекта"}
                        name={"title"}
                        value={data.title}
                        onChange={handleChange}
                    />
                    <textarea
                        className="describe"
                        required
                        placeholder={"Описание проекта"}
                        name={"note"}
                        value={data.note}
                        onChange={handleChange}
                    />
                    <br/>
                    <label htmlFor="range">Переместите, чтобы выбрать ваш прогресс</label>
                    <input
                        required
                        type="range"
                        id="range"
                        min="0"
                        max="100"
                        name="progress"
                        value={data.progress}
                        onChange={handleChange}

                    />
                    <input className="edit" type="Submit" onClick={editMode ? editData : postData}/>
                </form>

            </div>
        </div>
    );
}

export default Modal