import React, { useState } from "react";
import axios from "axios";
import CSVInputComponent from "./Csvinput";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/login", { username, password });
            console.log(response.data);
            setLoggedIn(true);
            // Handle successful login
        } catch (error) {
            setErrorMessage("Incorrect username or password");
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen flex justify-center items-center">
            {loggedIn ? (
                <CSVInputComponent />
            ) : (
                // <Chart />
                <div className="max-w-xs bg-gray-800 p-8 rounded shadow">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        Login
                    </h2>
                    {errorMessage && (
                        <p className="text-red-500 mb-4">{errorMessage}</p>
                    )}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-white font-medium mb-2"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-200"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-white font-medium mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-200"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;
