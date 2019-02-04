"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var CourseActions = require('../../actions/courseActions');
var toastr = require('toastr');

var CourseList = React.createClass({
    _deleteCourse: function (id, event) {
        event.preventDefault();
        CourseActions.deleteCourse(id);
        toastr.success('Course Deleted');
    },

    _createCourseRow: function (course) {
        return (
            <tr key={course.id}>
                <td><a href={course.watchHref}>Watch</a></td>
                <td><a href="#" onClick={this._deleteCourse.bind(this, course.id)}>Delete</a></td>
                <td><Link to="manageCourse" params={{ id: course.id }}>{course.title}</Link></td>
                <td>{course.author.name}</td>
                <td>{course.category}</td>
                <td>{course.length}</td>
            </tr>
        );
    },

    render: function () {
        return (
            <table className="table">
                <thead>
                    <th></th>
                    <th></th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Length</th>
                </thead>
                <tbody>
                    {this.props.courses.map(this._createCourseRow, this)}
                </tbody>
            </table>
        );
    }
});

module.exports = CourseList;