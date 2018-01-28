import React, { Component } from 'react'

const KEYCODE_UP = 38;
const KEYCODE_DOWN = 40;
const IS_BROWSER = typeof document !== 'undefined';
const RE_NUMBER = /^[+-]?((\.\d+)|(\d+(\.\d+)?))$/;
const RE_INCOMPLETE_NUMBER = /^([+-]|\.0*|[+-]\.0*|[+-]?\d+\.)?$/;

function access(object, prop, defaultValue, ...args) {
    let result = object[prop];
    if (typeof result === 'function') {
        result = result(...args);
    }
    return result === undefined ? defaultValue : result;
}

/**
 * @see https://github.com/vlad-ignatov/react-numeric-input
 */
export default class NumericInput extends Component {

    static defaultProps = {
        step: 1,
        min: Number.MIN_SAFE_INTEGER || -9007199254740991,
        max: Number.MAX_SAFE_INTEGER || 9007199254740991,
        precision: null,
        parse: null,
        format: null,
        strict: false
    };

    static SPEED = 50;
    static DELAY = 500;
    static DIRECTION_UP = 'up';
    static DIRECTION_DOWN = 'down';

    constructor(...args) {
        super(...args);

        this._isStrict = !!this.props.strict;

        this.state = {
            stringValue: '',
            ...this._propsToState(this.props)
        };
        this.stop = this.stop.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.refsInput = {};
    }

    _propsToState(props) {
        let out = {};

        if (props.hasOwnProperty('value')) {
            out.stringValue = String(
                props.value || props.value === 0 ? props.value : ''
            ).trim();

            out.value = out.stringValue !== '' ?
                this._parse(props.value) :
                null
        }

        else if (!this._isMounted && props.hasOwnProperty('defaultValue')) {
            out.stringValue = String(
                props.defaultValue || props.defaultValue === 0 ? props.defaultValue : ''
            ).trim();

            out.value = props.defaultValue !== '' ?
                this._parse(props.defaultValue) :
                null
        }

        return out;
    }

    componentWillReceiveProps(props) {
        this._isStrict = !!props.strict;
        let nextState = this._propsToState(props);
        if (Object.keys(nextState).length) {
            this._ignoreValueChange = true;
            this.setState(nextState, () => {
                this._ignoreValueChange = false
            })
        }
    }

    componentWillUpdate() {
        this.saveSelection()
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this._ignoreValueChange
            && prevState.value !== this.state.value
            && (!isNaN(this.state.value) || this.state.value === null)
        ) {
            this._invokeEventCallback('onChange', this.state.value, this.refsInput.value, this.refsInput)
        }

        if (this._inputFocus) {
            this.refsInput.focus();

            // Restore selectionStart (if any)
            if (this.state.selectionStart || this.state.selectionStart === 0) {
                this.refsInput.selectionStart = this.state.selectionStart;
            }

            // Restore selectionEnd (if any)
            if (this.state.selectionEnd || this.state.selectionEnd === 0) {
                this.refsInput.selectionEnd = this.state.selectionEnd;
            }
        }

        this.checkValidity()
    }

    componentWillUnmount() {
        this._isMounted = false;

        this.stop();
    }

    componentDidMount() {
        this._isMounted = true;
        this.refsInput.getValueAsNumber = () => this.state.value || 0;

        this.refsInput.setValue = (value) => {
            this.setState({
                value: this._parse(value),
                stringValue: value
            })
        };

        if (!this._inputFocus && IS_BROWSER && document.activeElement === this.refsInput) {
            this._inputFocus = true;
            this.refsInput.focus();
            this._invokeEventCallback('onFocus', {
                target: this.refsInput,
                type: 'focus'
            });
        }

        this.checkValidity();
    }

    saveSelection() {
        this.state.selectionStart = this.refsInput.selectionStart;
        this.state.selectionEnd = this.refsInput.selectionEnd;
    }

    checkValidity() {
        let valid, validationError = '';
        let supportsValidation = !!this.refsInput.checkValidity;

        let noValidate = !!(
            this.props.noValidate && this.props.noValidate != 'false'
        );

        this.refsInput.noValidate = noValidate;

        valid = noValidate || !supportsValidation;

        if (valid) {
            validationError = ''
        }
        else {
            if (this.refsInput.pattern === '') {
                this.refsInput.pattern = this.props.required ? '.+' : '.*'
            }

            if (supportsValidation) {
                this.refsInput.checkValidity();
                valid = this.refsInput.validity.valid;

                if (!valid) {
                    validationError = this.refsInput.validationMessage;
                }
            }

            if (valid && supportsValidation && this.props.maxLength) {
                if (this.refsInput.value.length > this.props.maxLength) {
                    validationError = 'This value is too long';
                }
            }
        }

        validationError = validationError || (
            valid ? '' : this.refsInput.validationMessage || 'Unknown Error'
        );

        let validStateChanged = this._valid !== validationError;
        this._valid = validationError;
        if (validationError) {
            if (validStateChanged) {
                this._invokeEventCallback(
                    'onInvalid',
                    validationError,
                    this.state.value,
                    this.refsInput.value
                )
            }
        }
        else {
            if (validStateChanged) {
                this._invokeEventCallback(
                    'onValid',
                    this.state.value,
                    this.refsInput.value
                )
            }
        }
    }

    _toNumber(x) {
        let n = parseFloat(x);
        if (isNaN(n) || !isFinite(n)) {
            n = 0;
        }

        if (this._isStrict) {
            let precision = access(this.props, 'precision', null, this);
            let q = Math.pow(10, precision === null ? 10 : precision);
            let _min = +access(this.props, 'min', NumericInput.defaultProps.min, this);
            let _max = +access(this.props, 'max', NumericInput.defaultProps.max, this);
            n = Math.min(Math.max(n, _min), _max);
            n = Math.round(n * q) / q;
        }

        return n;
    }

    _parse(x) {
        x = String(x);
        if (typeof this.props.parse === 'function') {
            return parseFloat(this.props.parse(x));
        }

        return parseFloat(x);
    }

    _format(n) {
        let _n = this._toNumber(n);
        let precision = access(this.props, 'precision', null, this);
        if (precision !== null) {
            _n = n.toFixed(precision);
        }

        _n += '';

        if (this.props.format) {
            return this.props.format(_n);
        }

        return _n;
    }

    _step(n, callback) {
        let _isStrict = this._isStrict;
        this._isStrict = true;

        let _step = +access(
            this.props,
            'step',
            NumericInput.defaultProps.step,
            this,
            (
                n > 0 ?
                    NumericInput.DIRECTION_UP :
                    NumericInput.DIRECTION_DOWN
            )
        );

        let _n = this._toNumber((this.state.value || 0) + _step * n);

        if (this
                .props
                .snap
        ) {
            _n = Math.round(_n / _step) * _step
        }

        this._isStrict = _isStrict;

        if (_n !== this.state.value) {
            this.setState({
                value: _n,
                stringValue: _n + ''
            }, callback);
            return true;
        }

        return false;
    }

    _onKeyDown(...args) {
        args[0].persist();
        this._invokeEventCallback('onKeyDown', ...args);
        let e = args[0];

        if (!e.isDefaultPrevented()) {
            if (e.keyCode === KEYCODE_UP) {
                e.preventDefault();
                this._step(e.ctrlKey || e.metaKey ? 0.1 : e.shiftKey ? 10 : 1);
            } else if (e.keyCode === KEYCODE_DOWN) {
                e.preventDefault();
                this._step(e.ctrlKey || e.metaKey ? -0.1 : e.shiftKey ? -10 : -1);
            } else {
                let value = this.refsInput.value, length = value.length;

                if (e.keyCode === 8) {
                    if (this.refsInput.selectionStart === this.refsInput.selectionEnd &&
                        this.refsInput.selectionEnd > 0 &&
                        value.length &&
                        value.charAt(this.refsInput.selectionEnd - 1) === '.') {
                        e.preventDefault();
                        this.refsInput.selectionStart = this.refsInput.selectionEnd = this.refsInput.selectionEnd - 1;
                    }
                } else if (e.keyCode === 46) {
                    if (this.refsInput.selectionStart === this.refsInput.selectionEnd &&
                        this.refsInput.selectionEnd < length + 1 &&
                        value.length &&
                        value.charAt(this.refsInput.selectionEnd) === '.') {
                        e.preventDefault();
                        this.refsInput.selectionStart = this.refsInput.selectionEnd = this.refsInput.selectionEnd + 1;
                    }
                }
            }
        }
    }

    stop() {
        if (this._timer) {
            clearTimeout(this._timer);
        }
    }

    increase(_recursive = false, callback) {
        this.stop();
        this._step(1, callback);
        let _max = +access(this.props, 'max', NumericInput.defaultProps.max, this);

        if (isNaN(this.state.value) || +this.state.value < _max) {
            this._timer = setTimeout(() => {
                this.increase(true);
            }, _recursive ? NumericInput.SPEED : NumericInput.DELAY);
        }
    }

    decrease(_recursive, callback) {
        this.stop();
        this._step(-1, callback);
        let _min = +access(this.props, 'min', NumericInput.defaultProps.min, this);
        if (isNaN(this.state.value) || +this.state.value > _min) {
            this._timer = setTimeout(() => {
                this.decrease(true);
            }, _recursive ? NumericInput.SPEED : NumericInput.DELAY);
        }
    }

    onMouseDown(dir, callback) {
        if (dir === 'down') {
            this.decrease(false, callback);
        }
        else if (dir === 'up') {
            this.increase(false, callback);
        }
    }

    onTouchStart(dir, e) {
        e.preventDefault();
        if (dir === 'down') {
            this.decrease();
        }
        else if (dir === 'up') {
            this.increase();
        }
    }

    onTouchEnd(e) {
        e.preventDefault();
        this.stop();
    }

    _invokeEventCallback(callbackName, ...args) {
        if (
            typeof this.props[callbackName] === 'function'
        ) {
            this.props[callbackName].call(null, ...args);
        }
    }

    render() {
        let props = this.props;
        let state = this.state;
        let mobile = IS_BROWSER && 'ontouchstart' in document;

        let {
            step, min, max, precision, parse, format, snap, componentClass,
            value, type, defaultValue, onInvalid, onValid, strict,
            ...rest
        } = this.props;

        let attrs = {
            input: {
                ref: (e) => {
                    if (e != null && e !== undefined) {
                        this.refsInput = e;
                    }
                },
                type: 'text',
                ...rest
            }
        };

        let stringValue = String(
            state.stringValue ||
            (state.value || state.value === 0 ? state.value : '') ||
            ''
        );

        let loose = !this._isStrict && (this._inputFocus || !this._isMounted);

        if (loose && RE_INCOMPLETE_NUMBER.test(stringValue)) {
            attrs.input.value = stringValue;
        }
        else if (loose && stringValue && !RE_NUMBER.test(stringValue)) {
            attrs.input.value = stringValue;
        }
        else if (state.value || state.value === 0) {
            attrs.input.value = this._format(state.value);
        }
        else {
            attrs.input.value = '';
        }

        if (!props.disabled && !props.readOnly) {
            Object.assign(attrs.input, {
                onChange: e => {
                    const original = e.target.value;
                    let val = this._parse(original);
                    if (isNaN(val)) {
                        val = null
                    }
                    this.setState({
                        value: this._isStrict ? this._toNumber(val) : val,
                        stringValue: original
                    })
                },
                onKeyDown: this._onKeyDown.bind(this),
                onInput: (...args) => {
                    this.saveSelection();
                    this._invokeEventCallback('onInput', ...args);
                },
                onSelect: (...args) => {
                    this.saveSelection();
                    this._invokeEventCallback('onSelect', ...args);
                },
                onFocus: (...args) => {
                    args[0].persist();
                    this._inputFocus = true;
                    const val = this._parse(args[0].target.value);
                    this.setState({
                        value: val,
                        stringValue: val || val === 0 ? val + '' : ''
                    }, () => {
                        this._invokeEventCallback(`onFocus`, ...args);
                    });
                },
                onBlur: (...args) => {
                    let _isStrict = this._isStrict;
                    this._isStrict = true;
                    args[0].persist();
                    this._inputFocus = false;
                    const val = this._parse(args[0].target.value);
                    this.setState({
                        value: val
                    }, () => {
                        this._invokeEventCallback('onBlur', ...args);
                        this._isStrict = _isStrict;
                    });
                }
            });
        }

        return (
            <input {...attrs.input}/>
        );
    }
}
