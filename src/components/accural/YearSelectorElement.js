import {observer} from 'mobx-react/index';
import React, {Component} from 'react';
import {classnames} from '../../utils/styles';

@observer
export default class YearSelectorElement extends Component
{
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick()
    {
        if (this.props.year.active === false)
        {
            this.props.year.active = true;
            this.props.changeCb(this.props.year);
        }

    }

    render() {
        let {year} = this.props;

        return (
            <div className={classnames({year: true, active: year.active})} onClick={this.onClick}>{year.year}</div>
        );
    }
}
