import React, {useContext} from 'react';
import {Dropdown, Table} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {changeStatus} from "../http/requestAPI";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownMenu from "react-bootstrap/DropdownMenu";

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
        <Table striped bordered hover >
            <thead>
            <tr>
                <th>#</th>
                <th>Тема</th>
                <th>Текст заявки</th>
                <th>Срок выполнения</th>
                <th>Статус заявки</th>
                <th>Исполнитель</th>
                <th>Отдел исполнителя</th>
                <th>Автор</th>
            </tr>
            </thead>
            <tbody>
            {request.requests.map(req => {
                    if (user.user_id === req.recipientId) {
                        return <tr>
                            <td>{i++}</td>
                            <td>{req.topic}</td>
                            <td>{req.text}</td>
                            <td>{req.exp_date}</td>
                            <td>
                                <Dropdown>
                                    <DropdownToggle>{req.status}</DropdownToggle>
                                    <DropdownMenu>
                                        {(req.status === 'Завершена')?null:
                                        <DropdownItem
                                            onClick={async () => {await changeStatus(req.id, 'Завершена'); window.location.reload()}}
                                        >Завершить</DropdownItem>}
                                        {(req.status === 'Отменена')?null:
                                        <DropdownItem
                                            onClick={async () => {await changeStatus(req.id, 'Отменена'); window.location.reload()}}
                                        >Отменить</DropdownItem>}
                                        {(req.status === 'Выполняется')?null:
                                        <DropdownItem
                                            onClick={async () => {await changeStatus(req.id, 'Выполняется'); window.location.reload()}}
                                        >Выполняется</DropdownItem>}
                                    </DropdownMenu>
                                </Dropdown>
                            </td>
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