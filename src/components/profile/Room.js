import React, { Component } from 'react';

import Unit from '../meters-data/Unit';

export default class Room extends Component {

    render() {
        let { data } = this.props;

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
                        <div className="cwd_content bold">{data.area} <Unit value="м2"/></div>
                    </div>
                    <div className="content_with_description">
                        <div className="cwd_description bold">Зарегистрировано</div>
                        <div className="cwd_content bold">{data.numberRegistered} человека</div>
                    </div>
                    <div className="content_with_icon">
                        <div className="cwi_icon icon_p_info"/>
                        <div className="cwi_content">
                            Для изменения информации раздела <span className="bold">Мои помещения</span> обратитесь в свою УК
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
