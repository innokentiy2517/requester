import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import NavMainBar from "../components/NavMainBar";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Departments from "../components/Departments";
import AllRequests from "../components/AllRequests";
import MyRequests from "../components/MyRequests";
import {fetchRequests} from "../http/requestAPI";
import {fetchDepartments} from "../http/departmentAPI";
import {fetchUsers} from "../http/userAPI";

const Main = observer(() => {
    const {globalStore, request,departments, workers} = useContext(Context)
    const isMyRequest = globalStore.selectedTab.name === 'Мои заявки'
    const isDepartments = globalStore.selectedTab.name === 'Отделы'
    const isAllRequests = globalStore.selectedTab.name === 'Все заявки'

    useEffect(()=> {
        fetchRequests().then(data => request.setRequests(data))
        fetchDepartments().then(data => departments.setDepartments(data))
        fetchUsers().then(data => workers.setWorkers(data))
    }, [])

    return (
        <Container >
            <Row>
                <Col md={2}>
                    <NavMainBar/>
                </Col>
                <Col md={10}>
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