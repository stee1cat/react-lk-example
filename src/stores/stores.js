import { store } from 'rfx-core';

import AppState from './AppState';
import MetersState from './MetersState';

export default store.setup({
    appState: AppState,
    metersState: MetersState
});
