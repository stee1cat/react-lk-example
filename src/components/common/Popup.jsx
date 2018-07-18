import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { classnames } from '../../utils/styles';

export default class Popup extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    opened: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.any,
  };

  static defaultProps = {
    onClose: () => null,
  };

  constructor(props) {
    super(props);

    this.onBodyClickHandler = this.onBodyClickHandler.bind(this);
  }

  state = {
    opened: false,
  };

  componentDidMount() {
    const { opened } = this.props;
    document.body.addEventListener('click', this.onBodyClickHandler);

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

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onBodyClickHandler);
  }

  onBodyClickHandler() {
    this.setState({
      opened: false,
    });

    this.emitClose();
  }

  emitClose() {
    const { onClose } = this.props;

    onClose();
  }

  render() {
    const { title, children } = this.props;
    const { opened } = this.state;
    const classes = classnames({
      popup: true,
      not_visible: !opened,
    });

    return (
      <div className={classes}>
        <div className="p_title">{title}</div>
        <div className="p_content">
          {children}
        </div>
      </div>
    );
  }
}
