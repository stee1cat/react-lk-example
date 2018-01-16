const LocalStorageKeys = {
    Token: 'token'
};

class LocalStorageService {

    constructor() {
        try {
            if ('localStorage' in window && window['localStorage'] !== null) {
                this.storage = window.localStorage;
            }
        } catch (e) {}
    }

    isSupported() {
        return !!this.storage;
    }

    get(key) {
        let value;

        if (this.storage) {
            try {
                value = JSON.parse(this.storage.getItem(key));
            } catch (e) {}
        }

        return value;
    }

    set(key, value) {
        if (this.storage) {
            this.storage.setItem(key, JSON.stringify(value));
        }
    }

    remove(key) {
        if (this.storage) {
            this.storage.removeItem(key);
        }
    }

}

const localStorageService = new LocalStorageService();

export {
    localStorageService,
    LocalStorageKeys
}
