import React, { useState, useEffect } from "react";
import UserForm from "./COMPONENTS/UserForm";

const URL = "https://rest-api-without-db.herokuapp.com/users/";
const App = () => {
  const [user, setUser] = useState(null); //For showing data
  const [isLoarding, setIsLoading] = useState(true); //for loading
  const [error, setError] = useState(null); // For error messages
  const [userBtn, setUserBtn] = useState(false); //For add and update button

  const [editUser, setEditUser] = useState({
    username: "",
    email: "",
  }); //For update users in api

  const [userId, setUserId] = useState(""); //For id that required to update users

  //For all fetch operations
  const getAllUsers = () => {
    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw Error("There is an error");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data.users);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };
  //################################

  useEffect(() => {
    getAllUsers();
  }, []);

  //For Delete users in api
  const handleDelete = (id) => {
    fetch(URL + `/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Delete is not possible");
        }
        console.log("delete done");
        getAllUsers();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  //################################

  //For Add User in  Api
  const handleAdddata = (users) => {
    fetch(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Update is not possible");
        }

        getAllUsers();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  //##############################

  //For Edit button
  const handleEdit = (id) => {
    setUserId(id);
    const filterValue = user.filter((data) => data.id === id);

    setEditUser({
      username: filterValue[0].username,
      email: filterValue[0].email,
    });

    setUserBtn(true);
  };
  //################################

  //For Edit users in Api
  const handleEditData = (data) => {
    console.log(data);

    fetch(URL + `/${userId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Update is not possible");
        }

        getAllUsers();
      })
      .catch((err) => {
        console.log(err.message);
      });
    setUserBtn(false);
  };
  //##############################

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>User Management</h1>
      {/*######################showing add button or update button##################*/}
      {userBtn ? (
        <UserForm
          btnText="Update"
          editUser={editUser}
          handleAdddata={handleEditData}
        />
      ) : (
        <UserForm btnText="Add" handleAdddata={handleAdddata} />
      )}
      {/*################################################################################*/}
      <h2> {isLoarding && "Loading..."}</h2>
      {error && <h2>{error.message}</h2>}
      <section className="cards">
        {/*########################for mapping users from api#######################*/}
        {user &&
          user.map((data) => {
            const { id, username, email } = data;
            return (
              <article key={id} className="card">
                <h2>{username}</h2>
                <h2>{email}</h2>
                <div>
                  <button
                    className="btn"
                    onClick={() => {
                      handleEdit(id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      handleDelete(id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        {/*#####################################################################################*/}
      </section>
    </div>
  );
};

export default App;
