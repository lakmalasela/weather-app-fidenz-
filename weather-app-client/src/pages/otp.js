import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authService } from '../api/authService';
import './css/LoginPage.css';
import './css/otp.css';

const OTPPage = () => {
    const [step, setStep] = useState('email'); // 'email' or 'otp'
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const emailValidationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const otpValidationSchema = Yup.object({
        otp: Yup.string().length(6, 'OTP must be 6 digits').required('Required'),
    });

    const handleEmailSubmit = async (values) => {
        setIsLoading(true);
        try {
            await authService.requestOTP(values.email);
            setEmail(values.email);
            setStep('otp');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOTPSubmit = async (values) => {
        setIsLoading(true);
        try {
            await authService.verifyOTP(email, values.otp);
            window.history.replaceState({}, '', '/dashboard');
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.message || 'Invalid OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToEmail = () => {
        setStep('email');
        setEmail('');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">
                    {step === 'email' ? 'Login with OTP' : 'Enter OTP'}
                </h2>

                {step === 'email' ? (
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={emailValidationSchema}
                        onSubmit={handleEmailSubmit}
                    >
                        <Form>
                            <div className="form-group">
                                <label><i class="ri-mail-line"></i> Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="input-field"
                                />
                                <ErrorMessage name="email" component="div" className="error-text" />
                            </div>

                            <button 
                                type="submit" 
                                className="login-button"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending OTP...' : 'Send OTP'}
                            </button>
                        </Form>
                    </Formik>
                ) : (
                    <div>
                        <p className="otp-info">
                            OTP has been sent to: <strong>{email}</strong>
                        </p>
                        
                        <Formik
                            initialValues={{ otp: '' }}
                            validationSchema={otpValidationSchema}
                            onSubmit={handleOTPSubmit}
                        >
                            <Form>
                                <div className="form-group">
                                    <label>Enter 6-digit OTP</label>
                                    <Field
                                        name="otp"
                                        type="text"
                                        placeholder="000000"
                                        className="input-field"
                                        maxLength={6}
                                    />
                                    <ErrorMessage name="otp" component="div" className="error-text" />
                                </div>

                                <button 
                                    type="submit" 
                                    className="login-button"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                                </button>
                            </Form>
                        </Formik>

                        <button 
                            className="back-button"
                            onClick={handleBackToEmail}
                        >
                            Back to Email
                        </button>
                    </div>
                )}

                <div className='mt-2 back-to-login'>
                    <a href="/">Back to Login</a>
                </div>
            </div>
        </div>
    );
};

export default OTPPage;