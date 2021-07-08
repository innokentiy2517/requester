import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import CreateRequest from "./modals/CreateRequest";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [createRequestVisible, setCreateRequestVisible] = useState(false)
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        history.push(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={MAIN_ROUTE}>Менеджер заявок</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button className="mr-2" variant={"success"} onClick={() => setCreateRequestVisible(true)}>Создать заявку</Button>
                        <Button variant={"outline-info"} onClick={() => logOut()}>Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-info"} onClick={()=>history.push(LOGIN_ROUTE)}>Авторизоваться</Button>
                    </Nav>
                }
                <CreateRequest show={createRequestVisible} onHide={() => setCreateRequestVisible(false)}/>
            </Container>
        </Navbar>
    );
});

export default NavBar;