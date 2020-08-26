import React from 'react';
import $ from 'jquery';
// import { nameByRace } from 'fantasy-name-generator';
import LoginFormSelectAvatarOptionList from './LoginFormSelectAvatarOptionList';
import countriesList from '../utils/countries-list';
import avatarsList from '../utils/avatars-list';
// import fantasyRacesList from '../utils/fantasy-races-list';

// const randomNum = (num) => Math.floor(Math.random() * num);

// const randomAge = randomNum(40) + 15; // from 15 to 55 max is 99
// const randomGender = randomAge % 2 === 0 ? 'female' : 'male';
// const randomName = nameByRace(
//   fantasyRacesList[randomNum(fantasyRacesList.length)],
//   { gender: randomGender }
// ).slice(0, 15);
// const randomCountry = countriesList[randomNum(countriesList.length)];
// const randomAvatar =
//   avatarsList[`${randomGender}s`][
//     randomNum(avatarsList[`${randomGender}s`].length)
//   ];

// const defaultState = {
//   name: randomName,
//   gender: randomGender,
//   age: randomAge,
//   country: randomCountry,
//   avatar: randomAvatar,
//   avatarsList: avatarsList[`${randomGender}s`],
//   errors: {},
// };

const defaultState = {
  name: '',
  gender: 'male',
  age: 33,
  country: 'China',
  avatar: '/images/avatars/males/20.png',
  avatarsList: avatarsList['males'],
  errors: {},
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    // we need to refresh all bootstrap selects in the
    // case if user press a back button in the browser
    $('.selectpicker').selectpicker('refresh');
  }

  handleNameChange(e) {
    const name = e.target.value;

    if (!name || name.match(/^[a-zA-Z0-9 ]{1,15}$/)) {
      this.setState({ name });
    }
  }

  handleCountryChange(e) {
    const country = e.target.value;

    if (countriesList.indexOf(country) !== -1) {
      this.setState({ country });
    }
  }

  handleGenderChange(e) {
    const gender = e.target.value;

    if (gender === 'female' || gender === 'male') {
      this.setState(
        {
          gender,
          avatar: `/images/avatars/${gender}s/01.png`,
          avatarsList: avatarsList[`${gender}s`],
        },
        () => {
          // we have to manually rerender the bootstrap select plugin
          // to change avatars images after the change of gender
          $('.avatar-selectpicker').selectpicker('refresh');
        }
      );
    }
  }

  handleAgeChange(e) {
    const age = e.target.value;

    if (!age || (age <= 99 && age >= 1)) {
      this.setState({ age });
    }
  }

  handleAvatarChange(e) {
    const gender = this.state.gender;
    const avatar = e.target.value;

    if (
      (gender === 'female' || gender === 'male') &&
      avatarsList[`${gender}s`].indexOf(avatar) !== -1
    ) {
      this.setState({ avatar });
    }
  }

  async handleFormSubmit(e) {
    e.preventDefault();

    let user = { ...this.state };
    delete user.avatarsList;

    const previouslyLoggedUser = JSON.parse(
      sessionStorage.getItem('user') || false
    );

    if (previouslyLoggedUser) {
      user.id = previouslyLoggedUser.id;
    }

    try {
      const response = await fetch('/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (response.status === 201) {
        user = await response.json();
        // localStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('user', JSON.stringify(user));
        this.props.history.push('/chat');
      }

      if (response.status === 400) {
        const errors = await response.json();
        this.setState({ errors });
      }
    } catch (error) {
      console.log('Server error occured');
    }
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} className="font-weight-bold">
        <div className="form-group my-1">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
            id="name"
            className="form-control form-control-sm"
            placeholder="Enter Name"
          />
          {this.state.errors.name ? (
            <div className="error-message">{this.state.errors.name}</div>
          ) : null}
        </div>
        <div className="form-group my-1">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            className="selectpicker form-control form-control-sm show-tick"
            value={this.state.gender}
            onChange={this.handleGenderChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {this.state.errors.gender ? (
            <div className="error-message">{this.state.errors.gender}</div>
          ) : null}
        </div>
        <div className="form-group my-1">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            className="selectpicker form-control form-control-sm show-tick"
            value={this.state.country}
            onChange={this.handleCountryChange}
            data-live-search="true"
            data-size="5"
          >
            {countriesList.map((country) => {
              return (
                <option key={country} value={country}>
                  {country.replace(/_/g, ' ')}
                </option>
              );
            })}
          </select>
          {this.state.errors.country ? (
            <div className="error-message">{this.state.errors.country}</div>
          ) : null}
        </div>
        <div className="form-group my-1">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            value={this.state.age}
            id="age"
            className="form-control form-control-sm"
            onChange={this.handleAgeChange}
          />
          {this.state.errors.age ? (
            <div className="error-message">{this.state.errors.age}</div>
          ) : null}
        </div>

        <div className="form-group my-2">
          <LoginFormSelectAvatarOptionList
            avatar={this.state.avatar}
            avatarsList={this.state.avatarsList}
            onChange={this.handleAvatarChange}
          />
          {this.state.errors.avatar ? (
            <div className="error-message">{this.state.errors.avatar}</div>
          ) : null}
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-info btn-block btn-sm font-weight-bold login-submit-button"
          >
            JOIN
          </button>
        </div>
      </form>
    );
  }
}

export default LoginForm;
