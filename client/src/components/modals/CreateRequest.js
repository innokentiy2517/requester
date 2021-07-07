import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import DatePicker from 'react-date-picker'
import {observer} from "mobx-react-lite";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import {Context} from "../../index";
import {createRequest, fetchRequests} from "../../http/requestAPI";
import {fetchDepartments} from "../../http/departmentAPI";
import {fetchUsers} from "../../http/userAPI";

const CreateRequest = observer(({show, onHide}) => {
    const {workers, user,request,departments} = useContext(Context)
    useEffect(()=> {
        fetchRequests().then(data => request.setRequests(data))
        fetchDepartments().then(data => departments.setDepartments(data))
        fetchUsers().then(data => workers.setWorkers(data))
    }, [])
    const [topic, setTopic] = useState('')
    const [text, setText] = useState('')
    const [date, setDate] = useState('')
    const [recipient, setRecipient] = useState('')
    const [recipientFirstName, setRecipientFirstName] = useState('')
    const [recipientSecondName, setRecipientSecondName] = useState('')
    const author_id = Number(user.user_id)
    //if (date) console.log(date.getMonth() + 1)

    const addRequest = () =>{
        console.log(topic)
        console.log(text)
        console.log(date)
        console.log(typeof recipient)
        console.log(typeof author_id)
        let textDate = date.getFullYear().toString() + " " + (date.getMonth() + 1).toString() + " " + date.getDate().toString()
        console.log(textDate)

        createRequest(topic, text, textDate, author_id, recipient).then(onHide())
    }

    const close = () => {
        setTopic('')
        setText('')
        setDate('')
        setRecipient('')
        setRecipientFirstName('')
        setRecipientSecondName('')
        onHide()
    }

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
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                />
                <Form.Control
                    as="textarea" rows={6}
                    className="mt-2"
                    placeholder={"Введите текст заявки"}
                    value={text}
                    onChange={e => setText(e.target.value)}
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
                    <DropdownToggle>{recipientFirstName? recipientFirstName +" "+ recipientSecondName : "Выберите исполнителя" }</DropdownToggle>
                    <DropdownMenu>
                        {workers.workers.map(worker =>{
                            if(worker.id === user.user_id) {}else {
                                return <Dropdown.Item
                                    onClick={() => {setRecipient(Number(worker.id)); setRecipientFirstName(worker.first_name); setRecipientSecondName(worker.second_name)}}
                                    key={worker.id}>{worker.first_name} {worker.second_name}</Dropdown.Item>
                            }}
                        )}
                    </DropdownMenu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={close}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addRequest}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateRequest;