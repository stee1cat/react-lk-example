import { observable } from 'mobx';
import { inject, observer } from 'mobx-react/index';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { classnames } from '../../utils/styles';
import AccuralExtInfo from './AccuralExtInfo';

function Fine({ fine }) {
  Fine.propTypes = {
    fine: PropTypes.number,
  };

  if (fine > 0) {
    return (
      <div className="sub_info">Включая задолженность: {fine.toFixed(2)} ₽</div>
    );
  }

  return null;
}

function Money({ money, success }) {
  Money.defaultProps = {
    money: 0,
    success: false,
  };

  Money.propTypes = {
    money: PropTypes.number,
    success: PropTypes.bool,
  };

  const str = money.toFixed(2);
  let [midNums, cents] = str.split('.');

  if (midNums.length > 3) {
    midNums = `${midNums.slice(0, -3)} ${midNums.slice(-3)}`;
  }

  const classes = classnames({
    value: true,
    success,
  });

  return (
    <div className={classes}>
      <div className="big_sum">{midNums}</div>
      <div className="cents">{cents}</div>
    </div>
  );
}

@inject('store')
@observer
export default class Accural extends Component {
  @observable extInfo = [];

  static propTypes = {
    store: PropTypes.object,
    accural: PropTypes.shape({
      period: PropTypes.string,
    }),
  };

  async componentWillMount() {
    let x = await this.props.store.accuralStore.loadPeriod(this.props.accural.period);

    this.extInfo = x.items;
  }

  render() {
    let { accural } = this.props;
    let date = new Date(accural.period);
    let periodName = date.toLocaleString('ru', {
      month: 'long',
    });
    let periodYear = date.getFullYear();

    periodName = periodName[0].toUpperCase() + periodName.slice(1);

    return (
      <Fragment>
        <input className="not_visible" type="checkbox" id={accural.period} />
        <div className="item">
          <div className="header">
            <div className="month_name">{periodName}, {periodYear}</div>
            <div className="history_toggler">
              <div className="text">Подробнее</div>
              <div className="divider" />
              <label htmlFor={accural.period} className="trigger" />
            </div>
          </div>
          <div className="accural_info">
            <div className="element">
              <div className="title">Сумма</div>
              <Money money={accural.amount} />
            </div>
            <div className="element">
              <div className="title">Пени</div>
              <Money money={accural.fine} />
            </div>
            <div className="element">
              <div className="title">К оплате</div>
              <Money money={accural.toPay} /> <Fine fine={accural.fine} />
            </div>
            <div className="element">
              <div className="title">Оплачено</div>
              <Money money={accural.paid} success={accural.paid === accural.toPay} />
            </div>
          </div>
          <AccuralExtInfo info={this.extInfo} id={accural.period} />
        </div>
      </Fragment>
    );
  }
}
