import {makeAutoObservable} from "mobx";

export default class DepartmentStore{
    constructor() {
        this._departments = [
            // {id: 1, department_number: 45, department_name: "Отдел разработки"},
            // {id: 2, department_number: 47, department_name: "Отдел поддержки"}
        ]
        this._selectedDepartment = {}
        makeAutoObservable(this)
    }

    setDepartments(departments){
        this._departments = departments
    }

    get departments(){
        return this._departments
    }

    setSelectedDepartment(department){
        this._selectedDepartment = department
    }

    get selectedDepartment(){
        return this._selectedDepartment
    }
}