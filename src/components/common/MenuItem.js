import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';

import { classnames } from '../../utils/styles';

export default class MenuItem extends Component {

    render() {
        let { item } = this.props;
        let currentPath = '-';

        if (item.children) {
            currentPath = `(${item.children.map(child => child.link)
                .join('|')})`;
        }

        return (
            <Route path={currentPath} children={({match}) => (
                <div className={classnames({'element m_element': true, 'active': match})}>
                    <div className={`icon icon_${item.icon}`}/>
                    <div className="text">{item.title}</div>
                    {item.children && (
                        <Fragment>
                            <div className="dropdown_button"/>
                            <div className="dropdown_menu">
                                {item.children.map(child => (
                                    <Route path={child.link} key={child.title} exact children={({match}) => (
                                        <div className={classnames({'ddm_element': true, 'active': match})}>
                                            <Link className="text" to={child.link}>
                                                {child.title}
                                            </Link>
                                        </div>
                                    )}/>
                                ))}
                            </div>
                        </Fragment>
                    )}
                </div>
            )}/>

        );
    }

}
