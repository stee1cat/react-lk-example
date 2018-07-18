import { inject, observer } from 'mobx-react/index';
import { observable } from 'mobx';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { updateTitle } from '../utils/app';
import AccuralBoard from './accural/AccuralBoard';
import YearSelector from './accural/YearSelector';
import Protected from './common/Protected';

@inject('store')
@observer
class Accurals extends Component {
  @observable periods = [];

  static propTypes = {
    store: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    updateTitle('Начисления');
    this.store = this.props.store.accuralStore;
  }

  @observable state = {
    selectedYear: (() => (new Date()).getFullYear())(),
  };

  async componentWillMount() {
    await this.store.load(this.state.selectedYear);
  }

  async componentDidMount() {
    await this.loadPeriods();
  }

  async onChange(year) {
    this.state.selectedYear = year.year;

    await this.loadPeriods();
  }

  async loadPeriods() {
    this.periods = await this.store.loadYear(this.state.selectedYear);
  }

  render() {
    return (
      <div className="main_container">
        <div className="headline">
          <YearSelector
            years={this.store.years}
            state={this.state}
            onChange={this.onChange}
          />
        </div>
        <div className="accurals_page">
          <div className="content_block">
            <AccuralBoard periods={this.periods} />
          </div>
        </div>
      </div>
    );
  }
}

export default Protected(Accurals);
