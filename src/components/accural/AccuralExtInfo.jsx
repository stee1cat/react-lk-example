import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export default function AccuralExtInfo({ info, id }) {
  AccuralExtInfo.propTypes = {
    info: PropTypes.object,
    id: PropTypes.string,
  };

  return (
    <div className="details_container">
      <div className="details_table">
        <div className="row header">
          <div className="cell">Услуга ЖКХ</div>
          <div className="cell">Тариф</div>
          <div className="cell">Расход</div>
          <div className="cell">Начислено</div>
          <div className="cell">Льгота</div>
          <div className="cell">Перерасчёт</div>
          <div className="cell">Итого</div>
        </div>
        {info.map((it, i) => (
          <Fragment key={it.zkhService}>
            <input className="not_visible" type="checkbox" id={`${id}-${i}`} />
            <label htmlFor={`${id}-${i}`} className="ext_trigger">
              {it.zkhService}
            </label>
            <div className="row">
              <div data-info="Услуга ЖКХ" className="cell">{it.zkhService}</div>
              <div data-info="Тариф" className="cell">{it.tariff}</div>
              <div data-info="Расход" className="cell">{it.rate}</div>
              <div data-info="Начислено" className="cell">{it.accrued}</div>
              <div data-info="Льгота" className="cell">{it.exemption}</div>
              <div data-info="Перерасчёт" className="cell">{it.recalculation}</div>
              <div data-info="Итого" className="cell">{it.total}</div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
