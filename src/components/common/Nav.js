import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';

import { classnames } from '../../utils/styles';
import ActiveLink from '../ui/ActiveLink';

@inject('store')
@observer
export default class Nav extends Component {

    state = {
        opened: false
    };

    navElemenet = null;

    constructor(props) {
        super(props);

        this.appStore = this.props.store.appStore;
        this.accountStore = this.props.store.accountStore;

        this.logout = this.logout.bind(this);
        this.setNavElement = this.setNavElement.bind(this);

        this.onBodyClick = this.onBodyClick.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    logout() {
        this.appStore.logout();
    }

    setNavElement(element) {
        this.navElemenet = element;
    }

    onBodyClick({target}) {
        if (!target.contains(this.navElemenet)) {
            this.setState({
                opened: false
            });
        }
    }

    onButtonClick() {
        if (!this.state.opened) {
            this.setState({
                opened: true
            });
        }
    }

    componentDidMount() {
        document.body.addEventListener('click', this.onBodyClick);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.onBodyClick);
    }

    render() {
        const { personalData } = this.accountStore.info;
        const { authenticated, authenticating } = this.appStore;
        const classes = classnames({
            'left_side_bar': true,
            'not_visible': !this.state.opened
        });

        return (
            <Fragment>
                <nav className={classes} ref={this.setNavElement}>
                    <div className="base">
                        <div className="block border_bottom_divider">
                            <div className="element account_name">
                                <div className="part">{personalData.fio}</div>
                            </div>
                            <div className="element">
                                <div className="content_with_description border_bottom_divider">
                                    <div className="cwd_description bold">УК</div>
                                    <div className="cwd_content bold">{personalData.uk}</div>
                                </div>
                            </div>
                            <div className="element">
                                <div className="content_with_description">
                                    <div className="cwd_description bold">Л/С</div>
                                    <div className="cwd_content bold">{personalData.ls}</div>
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
                                        <div className="text">
                                            <ActiveLink to="meters-data">Показания</ActiveLink>
                                        </div>
                                    </div>
                                    <div className="ddm_element">
                                        <div className="text">Анализ</div>
                                    </div>
                                </div>
                            </div>
                            <div className="element m_element">
                                <div className="icon icon_graph"/>
                                <div className="text">Начисления</div>
                            </div>
                            <div className="element m_element">
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
                                <div className="text uppercase" onClick={this.logout}>Выйти</div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div onClick={this.onButtonClick}>
                    navigation
                </div>
            </Fragment>
        );
    }

}
