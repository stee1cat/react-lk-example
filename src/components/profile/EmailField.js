import { inject } from 'mobx-react/index';
import React, { Component } from 'react';

import Field from './Field';

@inject('store')
export default class EmailField extends Component {

    constructor(props) {
        super(props);

        this.accountStore = this.props.store.accountStore;
        this.onChange = this.onChange.bind(this);
    }

    async onChange(email) {
        await this.accountStore.updateEmail(email);
    }

    render() {
        let { value } = this.props;

        return <Field value={value} onChange={this.onChange}/>
    }

}
