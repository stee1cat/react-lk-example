import {observer} from 'mobx-react/index';
import React, {Component, Fragment} from 'react';
import YearDisplay from './YearDisplay';
import YearSelectorElement from './YearSelectorElement';

@observer
export default class YearSelector extends Component
{
    constructor(props) {
        super(props);
    }

    onChange(year)
    {
        this.props.years.forEach((it) => {
            if (it !== year && it.active === true)
            {
                it.active = false;
            }
        });

        this.props.changeCb(year);
    }

    render() {
        let elements = this.props.years.map((it) => {
            return <YearSelectorElement key={it.id}
                                        year={it}
                                        changeCb={this.onChange.bind(this)}/>;
        });

        let {state} = this.props;

        return (
            <Fragment>
                <input className="not_visible" type="checkbox" id="year-selector"/>
                <div className="text">
                    <span className="title_text">Начисления в</span>
                    <label className="trigger" htmlFor="year-selector">
                        <YearDisplay value={state}/>
                        <div className="icon"></div>
                        <div className="years_container">
                            {elements}
                        </div>
                    </label>
                </div>
            </Fragment>
        )
    }
}
