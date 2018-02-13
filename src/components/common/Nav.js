import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';

import MenuItem from './MenuItem';
import {Link} from 'react-router-dom';

@inject('store')
@observer
export default class Nav extends Component {

    state = {
        opened: false
    };

    items = [
        //{
        //    title: 'Счётчики',
        //    icon: 'home',
        //    children: [
        //        {
        //            title: 'Показания',
        //            link: '/meters-data'
        //        }
        //        //,
        //        //{
        //        //    title: 'Анализ',
        //        //    link: '/sdasd'
        //        //}
        //    ]
        //},
        {
            title: 'Показания',
            icon: 'home',
            link: '/meters-data'
        },
        {
            title: 'Начисления',
            link: '/accurals',
            icon: 'graph'
        }
        //,
        //{
        //    title: 'Заявки',
        //    icon: 'star'
        //},
        //{
        //    title: 'Обращения',
        //    icon: 'message'
        //},
        //{
        //    title: 'Документы',
        //    icon: 'packet'
        //}
    ];

    constructor(props) {
        super(props);

        this.appStore = this.props.store.appStore;
        this.accountStore = this.props.store.accountStore;

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.appStore.logout();
    }

    render() {
        const { personalData } = this.accountStore.info;
        const { authenticated, authenticating } = this.appStore;

        return (
            <Fragment>
                <input className="not_visible" type="checkbox" id="left-side-bar-check"/>
                <nav className="left_side_bar">
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
                            <div className="element">
                                <Link className="profile_link" to="/">
                                    Профиль
                                </Link>
                            </div>
                        </div>
                        <div className="block menu">
                            {this.items.map(item => <MenuItem key={item.title} item={item}/>)}
                        </div>
                        <div className="block menu align_end">
                            <div className="element m_element">
                                <div className="icon icon_exit"/>
                                <div className="text uppercase" onClick={this.logout}>Выйти</div>
                            </div>
                        </div>
                    </div>
                </nav>
                <label htmlFor="left-side-bar-check"/>
            </Fragment>
        );
    }

}
