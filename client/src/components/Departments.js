import React, {useContext} from 'react';
import {Row, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Departments = observer( () => {
    const {workers, departments} = useContext(Context)
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Номер отдела</th>
                <th>Название отдела</th>
                <th>Сотрудники</th>
            </tr>
            </thead>
            <tbody>
            {departments.departments.map(dep =>
                <tr>
                    <td>{dep.id}</td>
                    <td>{dep.department_number}</td>
                    <td>{dep.department_name}</td>
                    <td>

                            {workers.workers.map(worker =>
                                {if(worker.department_id === dep.id){
                                    return <Row className="ml-1">{worker.first_name} {worker.second_name}</Row>
                                }})}

                    </td>
                </tr>
            )}
            </tbody>
        </Table>
    );
});

export default Departments;