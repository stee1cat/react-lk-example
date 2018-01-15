import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class Nav extends Component {

    constructor(props) {
        super(props);
        this.store = this.props.store.appState;
    }

    authenticate(e) {
        if (e) {
            e.preventDefault();
        }
        this.props.store.authenticate();
    }

    render() {
        const {authenticated, authenticating} = this.store;

        return (
            <nav className="left_side_bar not_visible">
                <div className="base">
                    <div className="block border_bottom_divider">
                        <div className="element account_name">
                            <div className="part">Иванов</div>
                            <div className="part">Иван</div>
                            <div className="part">Иванович</div>
                        </div>
                        <div className="element">
                            <div className="content_with_description border_bottom_divider">
                                <div className="cwd_description bold">УК</div>
                                <div className="cwd_content bold">Тёплый дом</div>
                            </div>
                        </div>
                        <div className="element">
                            <div className="content_with_description">
                                <div className="cwd_description bold">Л/С</div>
                                <div className="cwd_content bold">4600 4582 6633</div>
                            </div>
                        </div>
                    </div>
                    <div className="block menu">
                        <div className="element m_element">
                            <div className="icon icon_home"/>
                            <div className="text">Счётчики</div>
                            <div className="dropdown_button"/>
                            <div className="dropdown_menu">
                                <div className="ddm_element">
                                    <div className="text">Показания</div>
                                </div>
                                <div className="ddm_element">
                                    <div className="text">Анализ</div>
                                </div>
                            </div>
                        </div>
                        <div className="element m_element active">
                            <div className="icon icon_graph"/>
                            <div className="text">Начисления</div>
                        </div>
                        <div className="element m_element active">
                            <div className="icon icon_star"/>
                            <div className="text">Обращения</div>
                        </div>
                        <div className="element m_element">
                            <div className="icon icon_message"/>
                            <div className="text">Обращения</div>
                        </div>
                        <div className="element m_element">
                            <div className="icon icon_packet"/>
                            <div className="text">Документы</div>
                        </div>
                    </div>
                    <div className="block menu align_end">
                        <div className="element m_element">
                            <div className="icon icon_exit"/>
                            <div className="text uppercase">Выйти</div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

}
