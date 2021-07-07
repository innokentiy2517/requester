import {makeAutoObservable} from "mobx";

export default class WorkersStore{
    constructor() {
        this._workers = [
            // {id: 1, first_name: 'Иннокентий', second_name: 'Михайлов', department_id: 2},
            // {id: 2, first_name: 'Александр', second_name: 'Михеев', department_id: 1},
            // {id: 3, first_name: 'Александр', second_name: 'Зайцев', department_id: 1},
            // {id: 4, first_name: 'Михаил', second_name: 'Тихонов', department_id: 2},
            // {id: 5, first_name: 'Евгений', second_name: 'Первушин', department_id: 1},
            // {id: 6, first_name: 'Владимир', second_name: 'Комиссаров', department_id: 2},
            // {id: 7, first_name: 'Илья', second_name: 'Задбоев', department_id: 1},
            // {id: 8, first_name: 'Илья', second_name: 'Головнёв', department_id: 2}
        ]
        makeAutoObservable(this)
    }

    setWorkers(workers){
        this._workers = workers
    }

    get workers(){
        return this._workers
    }
}