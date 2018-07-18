import Cleave from 'cleave.js/react';
import MobxReactForm from 'mobx-react-form';
import { observer } from 'mobx-react/index';
import React, { Component, Fragment } from 'react';
import validator from 'validator';
import PropTypes from 'prop-types';

import { classnames } from '../../utils/styles';

const Mode = {
  View: 0,
  Edit: 1,
};

function EditMode({ classes, field, formatter }) {
  EditMode.propTypes = {
    classes: PropTypes.string,
    field: PropTypes.object,
    formatter: PropTypes.object,
  };

  return (
    <Fragment>
      <Cleave className={classes} {...field.bind()} options={formatter} />
      { field.error && <p className="error-message">{field.error}</p> }
    </Fragment>
  );
}

function ViewButton({ onClick }) {
  ViewButton.propTypes = {
    onClick: PropTypes.func,
  };

  return (
    <button className="only_icon icon_b_edit inlineblock float_right" onClick={onClick} type="button" />
  );
}

function EditButton() {
  return (
    <button className="simple autowidth inlineblock float_right" type="submit">Сохранить</button>
  );
}

@observer
export default class EditableField extends Component {
  static propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    validators: PropTypes.arrayOf(PropTypes.func),
    formatter: PropTypes.object,
  };

  static defaultProps = {
    name: 'value',
    validators: [],
    formatter: {},
    onChange: () => null,
  };

  constructor(props) {
    super(props);

    this.onEdit = this.onEdit.bind(this);
    this.setContainer = this.setContainer.bind(this);
    this.onBodyClickHandler = this.onBodyClickHandler.bind(this);

    this.createForm();
  }

  state = {
    mode: Mode.View,
  };

  componentDidMount() {
    document.body.addEventListener('click', this.onBodyClickHandler);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onBodyClickHandler);
  }

  onEdit(e) {
    this.setState(({ mode }) => ({
      mode: mode === Mode.View ? Mode.Edit : Mode.View,
    }));

    e.preventDefault();
  }

  onBodyClickHandler({ target }) {
    if (!this.container.contains(target)) {
      this.setState({
        mode: Mode.View,
      });

      this.form.reset();
    }
  }

  onSuccess() {
    const { mode } = this.state;
    const { value: initialValue, name } = this.props;
    const { form } = this;

    if (mode === Mode.Edit) {
      if (form.isValid) {
        const { value } = form.$(name);

        if (value !== initialValue) {
          this.emitChange(value);
        }

        this.setState({
          mode: Mode.View,
        });
      }
    }
  }

  setContainer(container) {
    this.container = container;
  }

  emitChange(value) {
    const { onChange } = this.props;

    onChange(value);
  }

  createForm() {
    const { name, validators, value } = this.props;
    const fields = [
      {
        name,
        type: 'text',
        validators,
        initial: value,
      },
    ];
    const hooks = {
      onSuccess: this.onSuccess.bind(this),
    };
    const plugins = {
      vjf: validator,
    };
    const options = {
      validateOnChange: true,
    };

    this.form = new MobxReactForm({ fields }, {
      hooks,
      plugins,
      options,
    });
  }

  render() {
    const { form } = this;
    const { mode } = this.state;
    const viewMode = mode === Mode.View;
    const { name, value, formatter } = this.props;
    const field = form.$(name);
    const classes = classnames({
      inlineblock: true,
      'has-error': field.error,
    });

    return (
      <form className="cwd_content bold" onSubmit={form.onSubmit} ref={this.setContainer}>
        {
          viewMode ? <span className="inlineblock">{value}</span> : (
            <EditMode classes={classes} field={field} formatter={formatter} />
          )
        }
        { viewMode ? <ViewButton onClick={this.onEdit} /> : <EditButton /> }
      </form>
    );
  }
}
