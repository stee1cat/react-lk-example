import { inject } from 'mobx-react/index';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isEmail, required } from '../../utils/validators';
import EditableField from './EditableField';

@inject('store')
export default class EmailField extends Component {
  static propTypes = {
    store: PropTypes.shape({
      accountStore: PropTypes.object,
    }),
  };

  constructor(props) {
    super(props);

    this.accountStore = props.store.accountStore;
    this.onChange = this.onChange.bind(this);
  }

  async onChange(email) {
    await this.accountStore.updateEmail(email);
  }

  render() {
    const { personalData } = this.accountStore.info;

    return (
      <div className="content_with_description">
        <div className="cwd_description bold">E-mail</div>
        <EditableField
          value={personalData.email}
          onChange={this.onChange}
          validators={[
            required,
            isEmail,
          ]}
        />
      </div>
    );
  }
}
