import { store } from 'rfx-core';

import AppStore from './AppStore';
import MetersStore from './MetersStore';
import AccountStore from './AccountStore';

export default store.setup({
    app: AppStore,
    meters: MetersStore,
    account: AccountStore
});
