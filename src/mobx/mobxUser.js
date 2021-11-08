import { makeAutoObservable } from "mobx";

class MobxUser {

    uID = '';

    user = null;

    constructor() {
        makeAutoObservable(this);
    }

    saveUID(id) {
        this.uID = id;
    }

    saveUser(user){
        this.user = user;
    }
}

export const mobxUser = new MobxUser();
