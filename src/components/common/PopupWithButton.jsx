import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Popup from './Popup';

export default class PopupWithButton extends Component {
  static propTypes = {
    btnClass: PropTypes.string,
    label: PropTypes.string,
    onClose: PropTypes.func,
    opened: PropTypes.bool,
    children: PropTypes.any,
  };

  static defaultProps = {
    btnClass: '',
    label: '',
    onClose: () => null,
    opened: false,
  };

  constructor(props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onCloseHandler = this.onCloseHandler.bind(this);
  }

  state = {
    opened: false,
  };

  componentDidMount() {
    const { opened } = this.props;

    this.setState({
      opened,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.opened !== this.props.opened) {
      this.setState({
        opened: nextProps.opened,
      });
    }
  }

  onClickHandler(e) {
    this.setState({
      opened: true,
    });

    e.preventDefault();
  }

  onCloseHandler() {
    const { onClose } = this.props;

    this.setState({
      opened: false,
    });

    onClose();
  }

  render() {
    const { btnClass, label, children } = this.props;
    const { opened } = this.state;

    return (
      <div className="sub_container_relative">
        <button type="button" className={btnClass} onClick={this.onClickHandler}>{label}</button>
        <Popup title={label} opened={opened} onClose={this.onCloseHandler}>
          {children}
        </Popup>
      </div>
    );
  }
}
