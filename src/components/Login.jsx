import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const onSubmit = () => {
    if (userName.length < 3) {
      return alert("The length of the name should be more than 3 characters");
    }
    const user = {
      userName: userName,
    };
    const users = JSON.parse(sessionStorage.getItem("users"));
    if (!users) {
      const users = [user];
      sessionStorage.setItem("users", JSON.stringify(users));
      navigate(`/home?user=${userName}`);
    }

    if (users.some((person) => person.userName === user.userName)) {
      return alert("That username is already taken.");
    }
    if (users) {
      sessionStorage.removeItem("users")
    }
    sessionStorage.setItem("users", JSON.stringify(user));
    navigate(`/home?user=${userName}`);
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Connect!
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    placeholder="Username"
                    autoComplete="username"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  onClick={onSubmit}
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
