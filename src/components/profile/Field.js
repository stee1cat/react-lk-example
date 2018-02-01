import Cleave from 'cleave.js/react';
import MobxReactForm from 'mobx-react-form';
import { observer } from 'mobx-react/index';
import React, { Component, Fragment } from 'react';
import validator from 'validator';
import { classnames } from '../../utils/styles';

const Mode = {
    View: 0,
    Edit: 1
};

@observer
export default class Field extends Component {

    static defaultProps = {
        name: 'value',
        validators: [],
        formatter: {},
        onChange: () => null
    };

    state = {
        mode: Mode.View
    };

    constructor(props) {
        super(props);

        this.onEdit = this.onEdit.bind(this);

        this.createForm();
    }

    createForm() {
        let { name, validators, value } = this.props;

        let fields = [
            {
                name,
                type: 'text',
                validators,
                initial: value
            }
        ];
        let hooks = {
            onSuccess: this.save.bind(this)
        };
        let plugins = {
            vjf: validator
        };
        let options = {
            validateOnChange: true
        };

        this.form = new MobxReactForm({fields}, {hooks, plugins, options});
    }

    onEdit(e) {
        this.setState(({mode}) => {
            return {
                mode: mode === Mode.View ? Mode.Edit : Mode.View
            };
        });

        e.preventDefault();
    }

    async save() {
        let { mode } = this.state;
        let form = this.form;

        if (mode === Mode.Edit) {
            if (form.isValid) {
                let value = form.$(this.props.name).value;

                this.emitChange(value);

                this.setState({
                    mode: Mode.View
                });
            } else {
                console.log('invalid');
            }
        }
    }

    emitChange(value) {
        let { onChange } = this.props;

        onChange(value);
    }

    componentDidMount() {
        let { value } = this.props;

        if (value) {
            this.setState({
                value
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    render() {
        let form = this.form;
        let { mode } = this.state;
        let { name, value, formatter } = this.props;
        let field = form.$(name);
        let classes = classnames({
            'inlineblock': true,
            'has-error': field.error
        });

        return (
            <form className="cwd_content bold" onSubmit={form.onSubmit}>
                {
                    mode === Mode.View ? <span className="inlineblock">{value}</span> :
                        <Fragment>
                            <Cleave className={classes} {...field.bind()} options={formatter}/>
                            {field.error && <p className="error-message">{field.error}</p>}
                        </Fragment>
                }
                {
                    mode === Mode.View ? <button className="only_icon icon_b_edit inlineblock float_right" onClick={this.onEdit} type="button"/> :
                        <button className="simple autowidth inlineblock float_right" type="submit">Сохранить</button>
                }
            </form>
        );
    }

}
