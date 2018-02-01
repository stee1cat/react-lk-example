import React, { Component } from 'react';

import { updateTitle } from '../utils/app';

export default class NotFound extends Component {

    constructor(props) {
        super(props);

        updateTitle('Страница не найдена');
    }

    render() {
        return (
            <div className='page notfound'>404</div>
        );
    }
}
