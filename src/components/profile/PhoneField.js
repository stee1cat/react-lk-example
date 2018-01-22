import { inject } from 'mobx-react/index';
import React, { Component } from 'react';

import Field from './Field';

@inject('store')
export default class PhoneField extends Component {

    constructor(props) {
        super(props);

        this.accountStore = this.props.store.accountStore;
        this.onChange = this.onChange.bind(this);
    }

    async onChange(phone) {
        await this.accountStore.updatePhone(phone);
    }

    render() {
        let { value } = this.props;

        return <Field value={value} onChange={this.onChange}/>
    }

}
