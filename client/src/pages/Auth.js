import React, {useContext, useState} from 'react';
import {Button, Card, Container, Dropdown, Form, Row} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {logIn, registration} from "../http/userAPI";

const Auth = observer(() => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const {departments, user} = useContext(Context)
    const history = useHistory()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [second_name, setSecond_name] = useState('')
    const [department_name, setDepartment_name] = useState('')

    const click = async () =>{
        try {
            let data;
            if (isLogin){
                data = await logIn(login, password)
            }else {
                data = await registration(first_name, second_name, department_name, login, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            user.setDep_id(data.dep_id)
            user.setUser_id(data.id)
            console.log(user.dep_id)
            history.push(MAIN_ROUTE)
        }catch (e){
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}< /h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите логин"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {isLogin ? null :
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваше имя"
                            value={first_name}
                            onChange={e => setFirst_name(e.target.value)}
                        />

                    }
                    {isLogin
                        ?
                        null
                        :
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите вашу фамилию"
                            value={second_name}
                            onChange={e => setSecond_name(e.target.value)}
                        />
                    }
                    {isLogin ? null :
                        <Dropdown className="mt-3">
                            <DropdownToggle>{departments.selectedDepartment.department_name || "Выберите отдел"}</DropdownToggle>
                            <Dropdown.Menu>
                                {departments.departments.map(department =>
                                    <Dropdown.Item
                                        onClick={() => {departments.setSelectedDepartment(department); setDepartment_name(departments.selectedDepartment.department_name)}}
                                        key={departments.id}
                                    >
                                        {department.department_name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}> Зарегестрироваться! </NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}> Войти! </NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                    </Row>
                </Form>
            </Card>


        </Container>
    );
});

export default Auth;