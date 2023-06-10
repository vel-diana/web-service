import {useState} from "react";
import {useCookies} from "react-cookie";

const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [isLogIn, setIsLogin] = useState(true)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConformPassword] = useState(null)
    const [error, setError] = useState(null)

    console.log(cookies)

    const viewLogin = (status) => {
        setError(null)
        setIsLogin(status)
    }

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault()
        if (!isLogIn && password !== confirmPassword) {
            setError("Пароли должны совпадать")
            return
        }

        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`,
            {method: "POST",
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({email, password})
            })

        const data = await response.json()


        if (data.detail) {
            setError(data.detail)
        } else {
            setCookie('Email', data.email)
            setCookie('AuthToken', data.email)
            window.location.reload()
        }
    }

    return (
    <div className="auth-container">
        <div className={"auth-container-box"}>
            <form>
                <h2>{isLogIn ? "Пожалуйста, авторизируйтесь" : "Пожалуйста, авторизируйтесь"}</h2>
                <input type="email" placeholder="Адрес электронной почты" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)}/>
                {!isLogIn && <input type="password" placeholder="Подтвердите пароль" onChange={(e) => setConformPassword(e.target.value)}/>}
                <input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogIn ? 'login': 'signup')}/>
                {error && <p>{error}</p>}
            </form>
                <div className="auth-options">
                    <button
                        onClick={() => viewLogin(false)}


                        >Зарегистрироваться</button>
                    <button onClick={() => viewLogin(true)}

                    >Авторизироваться</button>


                </div>
         </div>

    </div>
)
}

export default Auth