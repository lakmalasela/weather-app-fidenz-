import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authService } from '../api/authService';
import './css/LoginPage.css';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {

   const [showPassword, setShowPassword] = useState(false);
  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(4, 'Minimum 4 characters').required('Required'),
  });

  const handleSubmit = async (values) => {
    try {
      await authService.login(values.email, values.password);
      window.history.replaceState({}, '', '/dashboard');
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title"> <i class="ri-temp-cold-fill"></i> Login</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>

            <div className="form-group">
              <label> <i class="ri-mail-line"></i> Email</label>
              <Field
                name="email"
                type="email"
                placeholder="Enter your email"
                className="input-field"
              />
              <ErrorMessage name="email" component="div" className="error-text" />
            </div>

            <div className="form-group">
              <label><i class="ri-lock-2-line"></i> Password</label>
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input-field"
              />
               <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              <ErrorMessage name="password" component="div" className="error-text" />
            </div>

            <button type="submit" className="login-button">
              Login
            </button>

          </Form>
        </Formik>
      <div className='mt-2 login-with-otp'>
    <a href="/otp-login">Login with OTP</a>
  </div>
      </div>
    
    </div>
  );
};

export default LoginPage;