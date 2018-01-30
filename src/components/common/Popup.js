import React, { Component } from 'react';

import { classnames } from '../../utils/styles';

export default class Popup extends Component {

    static defaultProps = {
        onClose: () => null
    };

    state = {
        opened: false
    };

    constructor(props) {
        super(props);

        this.onBodyClickHandler = this.onBodyClickHandler.bind(this);
    }

    componentDidMount() {
        document.body.addEventListener('click', this.onBodyClickHandler);

        this.setState({
            opened: this.props.opened
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.opened !== this.props.opened) {
            this.setState({
                opened: nextProps.opened
            });
        }
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.onBodyClickHandler);
    }

    onBodyClickHandler() {
        this.setState({
            opened: false
        });

        this.emitClose();
    }

    emitClose() {
        this.props.onClose();
    }

    render() {
        let { title, content, titleAlign } = this.props;
        let { opened } = this.state;
        let classes = classnames({
            'popup': true,
            'not_visible': !opened
        });

        return (
            <div className={classes}>
                <div className="p_title">{title}</div>
                <div className="p_content">
                    <div className="content_with_icon">
                        <div className="cwi_icon icon_p_info"/>
                        <div className="cwi_content">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
