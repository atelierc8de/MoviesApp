import { makeAutoObservable } from "mobx";

class MobxUser {

    uID = '';
    listMore = [];
    disableAddMovie = false;
    user = null;
    movieAlreadySendNotification = null;

    constructor() {
        makeAutoObservable(this);
    }

    saveUID(id) {
        this.uID = id;
    }

    saveUser(user) {
        this.user = user;
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

    saveMovieSendNotification(id) {
        this.movieAlreadySendNotification = id;
    }
}

export const mobxUser = new MobxUser();
