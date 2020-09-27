/* eslint-disable */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import * as Cookies from "js-cookie";

import history from "../../store/history";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import * as userActions from '../../store/actions/userActions';
import * as alertActions from '../../store/actions/alertActions';

import { Grid, Row, Column } from 'carbon-components-react';
import { Form, FluidForm, TextInput, FormGroup, Button, Checkbox } from 'carbon-components-react';
import { ArrowRight32, ArrowLeft16 } from '@carbon/icons-react';

import LeftComponent from '../common/LeftComponent';


export const Fluid = (TextInputProps) => (
    <FluidForm >
        <TextInput
            type='text'
            labelText='Text input label'
            {...TextInputProps}
        />
    </FluidForm>

);

const LoginPage = props => {

    const [inputs, setInputs] = useState({
        email: '',
        company: '',
        password: '',
        login_type: ''
    });
    const LoggedUser = useSelector(state => state.UsersReducers);

    const [loginSetps, setLoginSteps] = useState(1);

    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();

    const { email, company, password, login_type } = inputs;

    // reset login status
    useEffect(() => {
        // dispatch(userActions.logout());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleOnBack = (e) => {
        const { name, value } = e.target;
        setLoginSteps(loginSetps - 1);
    }

    const handleSubmit = async (e) => {
        setSubmitted(false);
        e.preventDefault();
        if (loginSetps === 1) {
            setSubmitted(true);
            if (company) {
                setSubmitted(false);
                setLoginSteps(loginSetps + 1);
            }
        } else if (loginSetps === 2) {
            await setInputs(inputs => ({ ...inputs, login_type: 'SSO' }));
            setLoginSteps(loginSetps + 1)
            setSubmitted(false);
        }
        else if (loginSetps === 3) {
            setSubmitted(true);
            if (company && email) {
                setLoginSteps(loginSetps + 1);
                setSubmitted(false);
            }
        } else if (loginSetps === 4) {

            setSubmitted(true);
            if (email && company && password) {
                // get return url from location state or default to home page
                const { from } = location.state || { from: { pathname: "/" } };
                dispatch(userActions.login({ email, password, company }, from));
                setTimeout(() => {
                    // if(LoggedUser && LoggedUser)
                    if (Cookies.get("RCLOREHASH")) {
                        setLoginSteps(1);
                        setSubmitted(false);
                    }
                }, 300)
            } else {
                setSubmitted(true);
            }
        }
    }

    const DemoContent = ({ children }) => {
        return (
            <div className="outside">
                <div className="inside">{children}</div>
            </div>
        );
    };

    const inputProps = {
        FirstNameInputProps: ({ name, _name, placeholder }) => ({
            className: `${name.replace(/\s/g, '-').toLowerCase()}-class`,
            id: `${name.replace(/\s/g, '-').toLowerCase()}-input`,
            labelText: `${name}`,
            name: `${_name.replace(/\s/g, '_').toLowerCase()}`,
            placeholder,
            light: false,
            disabled: false,
            hideLabel: false,
            invalid: false,
            invalidText: `Please enter valid ${name.toLowerCase()}`,
            onFocus: () => {
                setSubmitted(false);
                dispatch(alertActions.hideToast())
            },
            onClick: () => { },
            onChange: handleChange,
        }),
        PasswordInputProps: () => ({
            tooltipPosition: 'bottom',
            tooltipAlignment: 'center',
            hidePasswordLabel: 'Hide password',
            showPasswordLabel: 'Show password',
        }),
    };

    const buttonEvents = {
        className: 'submit-class',
        onClick: handleSubmit,
    };

    return (
        <React.Fragment>
            {/* LoginPage */}
            <div style={{ height: '100vh' }}>
                <Grid style={{ height: '100vh', paddingLeft: 0 }}>
                    <Row style={{ height: '100vh' }}>
                        <Column sm={0} md={2} lg={3} style={{ background: '#000000', color: '#FFFFFF' }}>
                            <LeftComponent />
                        </Column>
                        <Column lg={6} style={{ margin: '0 auto' }}>
                            <div style={{ padding: 90, paddingLeft: 125, padddingRight: 125 }}>
                                <Grid>
                                    <Row>
                                        <Column>
                                            <div style={{ marginBottom: 70 }}>
                                                <h4 className="custom-font" >strobes</h4>
                                            </div>
                                            <div style={{ marginBottom: 70 }}>
                                                <h3>Log In</h3>
                                                <p style={{ fontSize: 13 }}>
                                                    Don't have an account? <a className="p-cursor" onClick={() => history.push('/register')}>Register Now</a></p>
                                            </div>
                                        </Column>
                                    </Row>
                                </Grid>
                                <Grid>
                                    <Row>
                                        {
                                            (loginSetps === 1 ? <Column lg={12} style={{ marginTop: 8 }}>
                                                <p style={{ fontSize: 13 }}>Enter your organization</p>
                                                <FluidForm>
                                                    <TextInput
                                                        type='text'
                                                        {...inputProps.FirstNameInputProps({
                                                            name: 'Organization Name',
                                                            _name: 'Company',
                                                            placeholder: 'my.strobes.co'
                                                        })}
                                                        value={company || ''}
                                                        invalid={submitted && !company}
                                                    />
                                                </FluidForm>
                                            </Column> : undefined)
                                        }
                                        {
                                            (loginSetps === 2 ? <Column lg={12} style={{ marginTop: 8 }}>
                                                <div style={{ display: 'flex', }}>
                                                    <a className="p-cursor" onClick={handleOnBack}>
                                                        <ArrowLeft16 style={{ marginTop: 2 }} />
                                                    </a>
                                                &nbsp;
                                                <p style={{ fontSize: 13, }}>{company}</p>
                                                </div>
                                                <FluidForm>
                                                    <Button kind="tertiary" style={{ maxWidth: '100%', width: '100%', marginTop: 10 }} type="submit" className="some-class"
                                                        onClick={handleSubmit}
                                                        renderIcon={ArrowRight32} iconDescription="ArrowRight">
                                                        Log in with SAML SSO
                                                    </Button>
                                                    <Button kind="tertiary" style={{ maxWidth: '100%', width: '100%', marginTop: 10 }} type="submit" className="some-class"
                                                        onClick={handleSubmit}
                                                        renderIcon={ArrowRight32} iconDescription="ArrowRight">
                                                        Log in with Google
                                                    </Button>
                                                    <Button kind="tertiary" style={{ maxWidth: '100%', width: '100%', marginTop: 10 }} type="submit" className="some-class"
                                                        onClick={handleSubmit}
                                                        renderIcon={ArrowRight32} iconDescription="ArrowRight">
                                                        Log in with Github
                                                    </Button>
                                                    <Button kind="tertiary" style={{ maxWidth: '100%', width: '100%', marginTop: 10 }} type="submit" className="some-class"
                                                        onClick={handleSubmit}
                                                        renderIcon={ArrowRight32} iconDescription="ArrowRight">
                                                        Log in with Bit Bucket
                                                    </Button>
                                                    <Button kind="tertiary" style={{ maxWidth: '100%', width: '100%', marginTop: 10 }} type="submit" className="some-class"
                                                        onClick={handleSubmit}
                                                        renderIcon={ArrowRight32} iconDescription="ArrowRight">
                                                        Log in with email
                                                    </Button>
                                                </FluidForm>
                                            </Column> : undefined)
                                        }
                                        {
                                            (loginSetps === 3 ? <Column lg={12} style={{ marginTop: 8 }}>
                                                <div style={{ display: 'flex', }}>
                                                    {/* <a className="p-cursor">
                                                        <ArrowLeft16 style={{ marginTop: 2 }} />
                                                    </a>
                                                &nbsp; */}
                                                    <p style={{ fontSize: 13, }}>Enter your Strobes ID</p>
                                                </div>
                                                <FluidForm>
                                                    <TextInput
                                                        type='text'
                                                        {...inputProps.FirstNameInputProps({
                                                            name: 'Email',
                                                            _name: 'Email',

                                                            placeholder: 'john.doe@example.com'
                                                        })}
                                                        value={email || ''}
                                                        invalid={submitted && !email}
                                                    />
                                                </FluidForm>
                                            </Column> : undefined)
                                        }
                                        {
                                            (loginSetps === 4 ? <Column lg={12} style={{ marginTop: 8 }}>
                                                <div style={{ display: 'flex', }}>
                                                    <a className="p-cursor" onClick={handleOnBack}>
                                                        <ArrowLeft16 style={{ marginTop: 2 }} />
                                                    </a>
                                                &nbsp;
                                                <p style={{ fontSize: 13, }}>{email}</p>
                                                </div>
                                                <FluidForm>
                                                    <TextInput.PasswordInput
                                                        {...inputProps.FirstNameInputProps({
                                                            name: 'password',
                                                            _name: 'password',
                                                            placeholder: 'Doe'
                                                        })}
                                                        value={password || ''}
                                                        invalid={submitted && !password}
                                                    />
                                                </FluidForm>
                                            </Column> : undefined
                                            )}
                                        {(loginSetps !== 2 ? <Column lg={12} >
                                            <Button style={{ maxWidth: '100%', width: '100%' }} type="submit" className="some-class" {...buttonEvents}
                                                renderIcon={ArrowRight32} iconDescription="ArrowRight">
                                                Continue
                                            </Button>
                                            <div>
                                                {(loginSetps === 3 || loginSetps === 4 ? (<a style={{ float: 'left', paddingTop: 17, color: '#000000' }}>
                                                    <Checkbox labelText="Remember Me" id="checkbox-label-1" />
                                                </a>, <a className="p-cursor" onClick={() => history.push('/reset-password')} style={{ float: 'right', paddingTop: 25 }}>Forgot Password?</a>) : undefined
                                                )}
                                                {(loginSetps === 1 ? <a style={{ float: 'right', paddingTop: 25 }}>Forgot Organization?</a> : undefined)}

                                            </div>
                                        </Column> : undefined
                                        )}
                                    </Row>
                                </Grid>
                                <div style={{ textAlign: 'center', position: 'absolute', bottom: 25, left: '53%' }}>

                                    <p style={{ fontSize: 12, }}> &copy; Copyright Strobes 2020; All rights reserved. </p>
                                </div>
                            </div>
                        </Column>
                    </Row>

                </Grid>
            </div>
        </React.Fragment>
    )
}

LoginPage.propTypes = {

}

export default LoginPage
