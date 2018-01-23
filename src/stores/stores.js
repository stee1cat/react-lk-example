import { store } from 'rfx-core';

import AppStore from './AppStore';
import MetersStore from './MetersStore';
import AccountStore from './AccountStore';

export default store.setup({
    appStore: AppStore,
    metersStore: MetersStore,
    accountStore: AccountStore
});
