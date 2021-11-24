import { runInAction, makeAutoObservable } from "mobx";

class MobxUser {

    uID = '';
    listMore = [];
    disableAddMovie = false;
    user = null;

    constructor() {
        makeAutoObservable(this);
    }

    saveUID(id) {
        this.uID = id;

        runInAction(() => {
            this.uID = id;
        })
    }

    saveUser(user) {
        this.user = user;
        runInAction(() => {
            this.user = user;
        })
    }

    logOut() {
        this.uID = '';
    }
    handleDisable() {
        this.disableAddMovie = true;
    }
    
    handleEnable() {
        this.disableAddMovie = false;
    }
}

export const mobxUser = new MobxUser();
