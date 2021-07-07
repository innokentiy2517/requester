import {makeAutoObservable} from "mobx";

export default class GlobalStore{
    constructor() {
        this._tabs = [
            {id: 1, name: 'Мои заявки'},
            /*{id: 2, name: 'Отделы'},*/
            /*{id: 2, name: 'Пользователи'}*/
            {id: 2, name: 'Все заявки'}
        ]
        this._selectedTab = []
        makeAutoObservable(this)
    }

    get tabs(){
        return this._tabs
    }
    get selectedTab() {
        return this._selectedTab;
    }
    setTabs(tabs){
        this._tabs = tabs
    }
    setSelectedTab(tab) {
        this._selectedTab = tab;
    }


}
