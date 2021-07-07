import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = false
        this._user = {}
        this._dep_id = {}
        this._user_id = {}
        makeAutoObservable(this)
    }
    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    setUser_id(user_id) {
        this._user_id = user_id
    }

    setDep_id(dep_id) {
        this._dep_id = dep_id
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get dep_id() {
        return this._dep_id;
    }

    get user_id() {
        return this._user_id;
    }
}