import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchOneRequest} from "../http/requestAPI";
import {Context} from "../index";

const RequestPage = () => {
    const {workers, departments} = useContext(Context)
    const [request, setReq] = useState({})
    const {id} = useParams()

    // fetchOneRequest(id).then(data => setReq(data))

    useEffect(() => {
        fetchOneRequest(id).then(data => setReq(data))
       // fetchDepartments().then(data => departments.setDepartments(data))
        //fetchUsers().then(data => workers.setWorkers(data))
    },[])
    console.log(request.recipientId)
    console.log(typeof departments)
    console.log(typeof workers)
    return (
        request?
        <Container>
            <Row>
                <Col md={2}>
                    Лево
                </Col>
                <Col md={7}>
                    <Table striped bordered hover>
                        <tbody>
                        <tr>
                            <td>Тема заявки</td>
                            <td>{request.topic}</td>
                        </tr>
                        <tr>
                            <td>Текст заявки</td>
                            <td>{request.text}</td>
                        </tr>
                        <tr>
                            <td>Срок выполнения заявки</td>
                            <td>{request.exp_date}</td>
                        </tr>
                        <tr>
                            <td>Статус заявки</td>
                            <td>{request.status}</td>
                        </tr>
                        <tr>
                            <td>Автор заявки</td>
                            <td>{workers.workers.find(worker =>{if(request.authorId === worker.id){return 'да' /*worker.first_name*/}else{return 'нет'}})} {workers.workers.find(worker =>{if(request.authorId === worker.id){return worker.second_name}})}</td>
                        </tr>
                        <tr>
                            <td>Исполнитель заявки</td>
                            <td>{workers.workers.map(worker => {if(request.recipientId === worker.id){return worker.first_name}})} {workers.workers.find(worker => {if(request.recipientId === worker.id){return worker.second_name}})}</td>
                        </tr>
                        <tr>
                            <td>Отдел исполнителя</td>
                            <td>{departments.departments.map(dep =>{if(request.departmentId === dep.id){return dep.department_name}})}</td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col md={3}>
                    Право
                </Col>
            </Row>
        </Container>
            :null
    );
};

export default RequestPage;