import Modal from "./Modal"
import { useState } from 'react'
import {useCookies} from "react-cookie";

const ListHeader = ({listName, getData}) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [showModal, setShowModal] = useState(false)

    const signOut = () => {
        console.log('signout')
        removeCookie('Email')
        removeCookie('AuthToken')
        window.location.reload()
    }
  return (
    <div className="list-header">
      <h1 className="header_main">{listName}</h1>
        <div className="button-container">
            <button className="create" onClick={() => setShowModal(true)}>Новый проект</button>
            <button className="signout" onClick={signOut}>Выйти</button>
        </div>
        {showModal && <Modal mode={'Создать'} setShowModal={setShowModal} getData={getData} />}
    </div>
  );
}

export default ListHeader