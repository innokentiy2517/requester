import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import DatePicker from 'react-date-picker'
import {observer} from "mobx-react-lite";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import {Context} from "../../index";

const CreateRequest = observer(({show, onHide}) => {
    const {workers, user} = useContext(Context)
    const [date, setDate] = useState()
    const [recipient, setRecipient] = useState()
    console.log(user.user_id)
    //console.log(date.getMonth()+1)
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создать заявку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    className="mt-2"
                    placeholder={"Введите тему заявки"}
                />
                <Form.Control
                    as="textarea" rows={6}
                    className="mt-2"
                    placeholder={"Введите текст заявки"}
                />
                <DatePicker
                    className="mt-2"
                    minDate = {new Date()}
                    onChange={setDate}
                    value={date}
                />
                <Dropdown
                    className="mt-2"
                >
                    <DropdownToggle>{recipient || "Выберите исполнителя"}</DropdownToggle>
                    <DropdownMenu>
                        {workers.workers.map(worker =>{
                            if(worker.id === user.user_id) {}else {
                                return <Dropdown.Item
                                    key={worker.id}>{worker.first_name} {worker.second_name}</Dropdown.Item>
                            }}
                        )}
                    </DropdownMenu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={onHide}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateRequest;