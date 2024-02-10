import LoginForm from "./LoginForm";

const NewLogin = () => {
    return (
        <div className="wrapper">
            <form action="">
                <div className="input-box">
                    <input type="text" placeholder="email"/>
                </div>
            </form>
            <LoginForm />
        </div>
    )
}

export default NewLogin;