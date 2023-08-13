import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

import { validata } from './validata';
import { notify } from './toastify';
import styles from "./SignUp.module.css";

const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(validata(data))
        
    }, [data, touched]);

    const focusHandeler = event => {
        setTouched({...touched, [event.target.name]: true})
    };

    const changeHandler = event => {
        if (event.target.name === "isAccepted") {
            setData({ ...data, [event.target.name]: event.target.checked })
        } else {
            setData({ ...data, [event.target.name]: event.target.value })
        }
    };

    const SubmitHandeler = event => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            notify("success", "Login successfully");
            console.log(data)
        } else {
            notify("error", "invalid data!");
            setTouched({
                email: true,
                password: true,
            })
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={SubmitHandeler} className={styles.formContainer}>
                <h2 className={styles.header}>Login</h2>
                <div className={styles.formField}>
                    <label>Email</label>
                    <input
                        className={(errors.email && touched.email) ? styles.uncompleted : styles.formInput}
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={changeHandler}
                        onFocus={focusHandeler} />
                    {errors.email && touched.email && <span>{errors.email}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Password</label>
                    <input
                        className={(errors.password && touched.password) ? styles.uncompleted : styles.formInput}
                        type="password" name="password"
                        value={data.password}
                        onChange={changeHandler}
                        onFocus={focusHandeler} />
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
                <div className={styles.formButtons}>
                    <Link to="/signup">Sign Up</Link>
                    <button type="submit">Login</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;