import { makeAutoObservable } from "mobx";

class MobxUser {
    uID = ''

    constructor() {
        makeAutoObservable(this)
    }

    saveUID(id) {
        this.uID = id;
    }
}

export const mobxUser = new MobxUser();
