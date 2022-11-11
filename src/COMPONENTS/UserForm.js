import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const UserForm = ({ handleAdddata, editUser, btnText }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const { username, email } = user; //for destructuring username and email from user

  useEffect(() => {
    setUser({
      username: editUser.username,
      email: editUser.email,
    });
  }, [editUser]);

  //###########For onchange events#################
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  //######################################################

  //###################For onSsubmit  events###############
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdddata(user);
  };
  //############################################

  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="username">Name: </label>
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={handlechange}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={handlechange}
            className="input"
          />
        </div>

        <button className="btn">{btnText}</button>
      </form>
    </div>
  );
};
UserForm.defaultProps = {
  editUser: {
    username: "",
    email: "",
  },
};
export default UserForm;
