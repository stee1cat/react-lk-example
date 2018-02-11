import {inject, observer} from 'mobx-react/index';
import React, {Component} from 'react';
import Accural from './Accural';

@inject('store')
@observer
export default class AccuralBoard extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let elements = this.props.periods.map((it) => {
            return <Accural key={it.period} accural={it}/>
        });

        return (
            <div className="accurals">
                {elements}
            </div>
        );
    }
}
