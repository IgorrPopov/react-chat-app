import React from 'react';

const defaultState = {
  name: '',
  isMale: true,
  isFemale: true,
  minAge: 1,
  maxAge: 99,
};

class ChatUsersSortingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState;

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMalesCheckboxChange = this.handleMalesCheckboxChange.bind(this);
    this.handleFemalesCheckboxChange = this.handleFemalesCheckboxChange.bind(
      this
    );
    this.handleMaxAgeChange = this.handleMaxAgeChange.bind(this);
    this.handleMinAgeChange = this.handleMinAgeChange.bind(this);
    this.handleFilterReset = this.handleFilterReset.bind(this);
  }

  handleNameChange(e) {
    const name = e.target.value;

    if (!name || name.match(/^[\w -]{1,15}$/)) {
      this.setState({ name }, () => this.props.handleUsersFilter(this.state));
    }
  }

  handleMalesCheckboxChange() {
    this.setState({ isMale: !this.state.isMale }, () =>
      this.props.handleUsersFilter(this.state)
    );
  }

  handleFemalesCheckboxChange() {
    this.setState({ isFemale: !this.state.isFemale }, () =>
      this.props.handleUsersFilter(this.state)
    );
  }

  handleMinAgeChange(e) {
    const minAge = e.target.value;

    if (!minAge || (minAge <= 99 && minAge >= 1)) {
      this.setState({ minAge }, () => this.props.handleUsersFilter(this.state));
    }
  }

  handleMaxAgeChange(e) {
    const maxAge = e.target.value;

    if (!maxAge || (maxAge <= 99 && maxAge >= 1)) {
      this.setState({ maxAge }, () => this.props.handleUsersFilter(this.state));
    }
  }

  handleFilterReset(e) {
    e.preventDefault();

    this.setState({ ...defaultState }, () =>
      this.props.handleUsersFilter(this.state)
    );
  }

  render() {
    return (
      <form
        className="form-inline chat-users-sort-form"
        onSubmit={this.handleFilterReset}
      >
        <div className="d-flex mt-1">
          <label htmlFor="name" className="font-smaller">
            Name:
          </label>
          <input
            value={this.state.name}
            id="name"
            type="text"
            className="form-control-sm filter-text-input ml-2"
            onChange={this.handleNameChange}
            autoComplete="off"
          />
        </div>
        <div className="d-flex chat-users-filter-checkbox">
          <div className="from-check">
            <label className="form-check-label font-smaller">
              Males:
              <input
                className="form-check-input mx-2 my-0"
                type="checkbox"
                checked={this.state.isMale}
                onChange={this.handleMalesCheckboxChange}
              />
            </label>
          </div>
          <div className="from-check females-form-check">
            <label className="form-check-label font-smaller">
              Females:
              <input
                className="form-check-input mx-2 my-0"
                type="checkbox"
                checked={this.state.isFemale}
                onChange={this.handleFemalesCheckboxChange}
              />
            </label>
          </div>
        </div>
        <div className="d-flex">
          <div className="d-flex">
            <label htmlFor="min-age" className="font-smaller">
              {' '}
              Min age:{' '}
            </label>
            <input
              value={this.state.minAge}
              id="min-age"
              type="number"
              className="form-control-sm filter-number-input mx-2"
              onChange={this.handleMinAgeChange}
            />
          </div>
          <div className="d-flex">
            <label htmlFor="max-age"> Max age: </label>
            <input
              value={this.state.maxAge}
              id="max-age"
              type="number"
              className="form-control-sm filter-number-input mx-2"
              onChange={this.handleMaxAgeChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-sm btn-info font-weight-bold">
          RESET
        </button>
      </form>
    );
  }
}

export default ChatUsersSortingForm;
