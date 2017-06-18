import React, { Component } from 'react';

class Attendance extends Component {

    addMemberRow( member, index ) {
        return (
            <tr key={index}>
                <td>{member.name}</td>
                <td>{member.id}</td>
            </tr>
        );
    };

    render() {
        return (
          <div className="attendance">
              <h2>Attendance {this.props.audience.length} members</h2>
              <table className="table table-striped">
                  <thead>
                      <tr>
                          <th>Audience Member</th>
                          <th>Socket ID</th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.props.audience.map(this.addMemberRow)}
                  </tbody>
              </table>
          </div>
        );
    };
};

export default Attendance
