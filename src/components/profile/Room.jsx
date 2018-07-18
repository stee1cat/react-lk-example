import React from 'react';
import PropTypes from 'prop-types';

import Unit from '../meters-data/Unit';

export default function Room({ data }) {
  Room.propTypes = {
    data: PropTypes.exact({
      address: PropTypes.string,
      area: PropTypes.number,
      numberRegistered: PropTypes.number,
    }),
  };

  return (
    <div className="content_block">
      <div className="cb_description uppercase">Мои помещения</div>
      <div className="cb_content">
        <div className="content_with_description">
          <div className="cwd_description bold">Адрес</div>
          <div className="cwd_content bold">{data.address}</div>
        </div>
        <div className="content_with_description">
          <div className="cwd_description bold">Площадь</div>
          <div className="cwd_content bold">{data.area} <Unit value="м2" /></div>
        </div>
        <div className="content_with_description">
          <div className="cwd_description bold">Зарегистрировано</div>
          <div className="cwd_content bold">{data.numberRegistered} человека</div>
        </div>
        <div className="content_with_icon">
          <div className="cwi_icon icon_p_info" />
          <div className="cwi_content">
            Для изменения информации раздела <span className="bold">Мои помещения</span> обратитесь в свою УК
          </div>
        </div>
      </div>
    </div>
  );
}
