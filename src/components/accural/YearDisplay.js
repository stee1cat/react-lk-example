import {observer} from 'mobx-react/index';
import React, {Component, Fragment} from 'react';

@observer
export default class YearDisplay extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        let {selectedYear} = this.props.value;

        return (
            <Fragment>
                <span className="year-text">{selectedYear} году</span>
            </Fragment>
        );
    }
}

