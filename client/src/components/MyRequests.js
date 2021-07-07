import React, {useContext} from 'react';
import {Context} from "../index";
import {Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const MyRequests = observer(() => {
    const {request, departments, workers, user} = useContext(Context)
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
            {request.requests.map(req =>
                {if(user.dep_id === req.department_id){
                        return <tr>
                            <td>{req.id}</td>
                                <td>{req.topic}</td>
                                <td>{req.exp_date}</td>
                               <td>{req.status}</td>
                                <td>{workers.workers.find(worker => {if(req.recipient_id === worker.id){return worker}}).first_name} {workers.workers.find(worker => {if(req.recipient_id === worker.id){return worker}}).second_name}</td>
                               <td>{departments.departments.find(dep =>{if(req.department_id === dep.id){return dep}}).department_number}</td>
                                <td>{workers.workers.find(worker =>{if(req.author_id === worker.id){return worker}}).first_name} {workers.workers.find(worker =>{if(req.author_id === worker.id){return worker}}).second_name}</td>

                        </tr>
                    }
                }
            )}
            </tbody>
        </Table>
    );
});

export default MyRequests;