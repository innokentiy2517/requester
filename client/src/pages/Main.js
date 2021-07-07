import React, {useContext} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import NavMainBar from "../components/NavMainBar";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Departments from "../components/Departments";
import AllRequests from "../components/AllRequests";
import MyRequests from "../components/MyRequests";

const Main = observer(() => {
    const {globalStore} = useContext(Context)
    const isMyRequest = globalStore.selectedTab.name === 'Мои заявки'
    const isDepartments = globalStore.selectedTab.name === 'Отделы'
    const isAllRequests = globalStore.selectedTab.name === 'Все заявки'
    console.log(isMyRequest)
    return (
        <Container >
            <Row>
                <Col md={3}>
                    <NavMainBar/>
                </Col>
                <Col md={9}>
                    {isDepartments?
                        <Departments/>
                        :null}
                    {isAllRequests?
                    <AllRequests/>:null}
                    {isMyRequest?
                    <MyRequests/>:null}
                </Col>
            </Row>
        </Container>
    );
});

export default Main;