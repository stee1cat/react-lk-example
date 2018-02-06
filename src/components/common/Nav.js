import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';

import { classnames } from '../../utils/styles';
import MenuItem from './MenuItem';

@inject('store')
@observer
export default class Nav extends Component {

    state = {
        opened: false
    };

    items = [
        {
            title: 'Счётчики',
            icon: 'home',
            children: [
                {
                    title: 'Показания',
                    link: '/meters-data'
                }
                //,
                //{
                //    title: 'Анализ',
                //    link: '/sdasd'
                //}
            ]
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

    navElemenet = null;

    constructor(props) {
        super(props);

        this.appStore = this.props.store.appStore;
        this.accountStore = this.props.store.accountStore;

        this.logout = this.logout.bind(this);
        this.setNavElement = this.setNavElement.bind(this);

        this.onBodyClickHandler = this.onBodyClickHandler.bind(this);
        this.onButtonClickHandler = this.onButtonClickHandler.bind(this);
    }

    logout() {
        this.appStore.logout();
    }

    setNavElement(element) {
        this.navElemenet = element;
    }

    onBodyClickHandler({target}) {
        if (!target.contains(this.navElemenet)) {
            this.setState({
                opened: false
            });
        }
    }

    onButtonClickHandler() {
        this.setState(({opened}) => ({
            opened: !opened
        }));
    }

    componentDidMount() {
        document.body.addEventListener('click', this.onBodyClickHandler);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.onBodyClickHandler);
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
                <div onClick={this.onButtonClickHandler} style={{display: 'inline-block'}}>
                    navigation
                </div>
            </Fragment>
        );
    }

}
