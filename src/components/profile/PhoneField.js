import { inject, observer } from 'mobx-react/index';
import React, { Component } from 'react';

import EditableField from './EditableField';
import { isPhone, required } from '../../utils/validators';

@observer
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
        const { personalData } = this.accountStore.info;

        let formatter = {
            prefix: '+7',
            delimiters: [' ', ' ', '-', '-'],
            numericOnly: true,
            blocks: [2, 3, 3, 2, 2]
        };

        return (
            <div className="content_with_description">
                <div className="cwd_description bold">Номер телефона</div>
                <EditableField value={personalData.phone} onChange={this.onChange} validators={[required, isPhone]} formatter={formatter}/>
            </div>
        )
    }

}
