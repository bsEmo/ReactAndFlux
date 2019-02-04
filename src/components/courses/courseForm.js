"use strict";

var React = require('react');
var TextInput = require('../common/textInput');
var DropDownInput = require('../common/dropdownInput');

var CourseForm = React.createClass({
    render: function () {
        return (
            <form>
                <TextInput 
                    name="title"
                    label="Title"
                    placeholder="Title"
                    value={this.props.course.title}
                    error={this.props.errors.title}
                    onChange={this.props.onChange} />

                <DropDownInput
                    name="author"
                    label="Author"
                    options={this.props.authorOptions}
                    error={this.props.errors.author}
                    onChange={this.props.onChange}
                    defaultValue={this.props.defaultValue} />

                <TextInput 
                    name="category"
                    label="Category"
                    placeholder="Category"
                    value={this.props.course.category}
                    error={this.props.errors.category}
                    onChange={this.props.onChange} />

                <TextInput 
                    name="length"
                    label="Length"
                    placeholder="Length"
                    value={this.props.course.length}
                    error={this.props.errors.length}
                    onChange={this.props.onChange} />

                <input 
                    type="submit" 
                    value="Save" 
                    className="btn btn-default"
                    onClick={this.props.onSave} />
            </form>
        );
    }
});

module.exports = CourseForm;