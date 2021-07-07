import React, {useContext, useEffect} from 'react';
import {Table} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchRequests} from "../http/requestAPI";
import {fetchDepartments} from "../http/departmentAPI";
import {check, fetchUsers} from "../http/userAPI";

const MyRequests = observer(() => {
    const {request, departments, workers, user} = useContext(Context)
    // useEffect(() => {
    //     fetchRequests().then(data => request.setRequests(data))
    //     fetchDepartments().then(data => departments.setDepartments(data))
    //     fetchUsers().then(data => workers.setWorkers(data))
    // }, [])
    console.log(request.requests)
    console.log(user.user)
    let i = 1
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Тема</th>
                <th>Срок выполнения</th>
                <th>Статус заявки</th>
                <th>Исполнитель</th>
                <th>Отдел исполнителя</th>
                <th>Автор</th>
            </tr>
            </thead>
            <tbody>
            {request.requests.map(req => {
                    if (user.dep_id === req.departmentId) {
                        return <tr>
                            <td>{i++}</td>
                            <td>{req.topic}</td>
                            <td>{req.exp_date}</td>
                            <td>{req.status}</td>
                            <td>{workers.workers.find(worker => {if (req.recipientId === worker.id) {return worker}}).first_name} {workers.workers.find(worker => {if (req.recipientId === worker.id) {return worker}}).second_name}</td>
                            <td>{departments.departments.find(dep =>{if(req.departmentId === dep.id){return dep}}).department_number}</td>
                            <td>{workers.workers.find(worker => {if (req.authorId === worker.id) { return worker}}).first_name} {workers.workers.find(worker => {if (req.authorId === worker.id) {return worker}}).second_name}</td>
                        </tr>
                    }
                }
            )}
            </tbody>
        </Table>
    );
});

export default MyRequests;