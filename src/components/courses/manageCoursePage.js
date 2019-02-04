"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var AuthorStore = require('../../stores/authorStore');
var CourseStore = require('../../stores/courseStore');
var CourseActions = require('../../actions/courseActions');
var toastr = require('toastr');
var _ = require('lodash');

var ManageCoursePage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    statics: {
        willTransitionFrom: function (transition, component) {
            if (component.state.dirty && !confirm("Leave without saving?")) {
                transition.abort();
            }
        }
    },
    
    getInitialState: function () {
        return {
            course: { title: '', author: '', category: '', length: '', defaultValue: '-1' },
            errors: {},
            dirty: false,
            authorOptions: this._generateAuthorOptions()
        };
    },

    componentWillMount: function () {
        if (this.props.params.id) {
            var course = CourseStore.getCourseById(this.props.params.id);      

            this.setState({ course: CourseStore.getCourseById(this.props.params.id),
                            defaultValue: course.author.id});
        }
    },

    _generateAuthorOptions: function () {
        var authors = AuthorStore.getAllAuthors();

        return authors.map(function (author) {
            return {
                description: author.firstName + ' ' + author.lastName,
                value: author.id,
                selected: false
            };
        });
    },

    _setCourseState: function (event) {
        this.setState({ dirty: true });

        var field = event.target.name;
        var value = event.target.value;
        this.state.course[field] = value;

        return this.setState({ course: this.state.course });
    },

    _courseFormIsValid: function () {
        var formIsValid = true;
        this.state.errors = {}; //clear previous errors

        if (this.state.course.title.length < 3) {
            this.state.errors.title = "Title must be at least 3 chatacters.";
            formIsValid = false;
        }

        if (this.state.course.author === null || this.state.course.author === ""  || this.state.course.author === "-1") {
            this.state.errors.author = "Author must have a value.";
            formIsValid = false;
        }

        if (this.state.course.category.length < 3) {
            this.state.errors.category = "Category must be at least 3 chatacters.";
            formIsValid = false;
        }

        if (this.state.course.length.length < 3) {
            this.state.errors.length = "Length must be at least 3 chatacters.";
            formIsValid = false;
        }

        this.setState({ errors: this.state.errors });

        return formIsValid;
    },

    _saveCourse: function (event) {
        event.preventDefault();

        if (!this._courseFormIsValid()) {
            return;
        }

        if (this.state.course.id) {
            CourseActions.updateCourse(this.state.course);
        } else {
            CourseActions.createCourse(this.state.course);
        }

        this.setState({ dirty: false });
        toastr.success("Course Saved.");
        this.transitionTo("courses");
    },

    render: function () {
        return (
            <div>
                <h1>Manage Course</h1>
                <CourseForm
                    course={this.state.course}
                    errors={this.state.errors}
                    dirty={this.state.dirty}
                    onChange={this._setCourseState}
                    onSave={this._saveCourse}
                    authorOptions={this.state.authorOptions}
                    defaultValue={this.state.defaultValue} />
            </div>
        );
    }
});

module.exports = ManageCoursePage;