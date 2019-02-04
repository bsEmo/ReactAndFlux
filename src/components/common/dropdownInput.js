"use strict";

var React = require('react');

var DropDownInput = React.createClass({
    _generateOption: function (option) {
        return (
            <option key={option.value} value={option.value}>{option.description}</option>
        );
    },

    render: function () {
        var wrapperClass = 'form-group';

        if (this.props.error) {
            wrapperClass += " has-error";
        }

        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <select name={this.props.name}
                        className="form-control"
                        ref={this.props.name}
                        onChange={this.props.onChange}
                        defaultValue={this.props.defaultValue}>
                        <option value="-1">Select an option.</option>
                        {this.props.options.map(this._generateOption, this)}
                    </select>
                    <div className="input">{this.props.error}</div>
                </div>
            </div>
        );
    }
});

module.exports = DropDownInput;