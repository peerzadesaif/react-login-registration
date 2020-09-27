/* eslint-disable */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import history from "../../store/history";
import * as userActions from '../../store/actions/userActions';
import LeftComponent from '../common/LeftComponent';

import { Grid, Row, Column } from 'carbon-components-react';
import { Form, FluidForm, TextInput, FormGroup, Button, Select, SelectItem } from 'carbon-components-react';
import { ArrowRight32 } from '@carbon/icons-react';

const RegisterPage = props => {
    const [inputs, setInputs] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        company: '',
        role: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();

    const { first_name, last_name, email, password, company, role } = inputs;
    const [passwordType, setPasswordType] = useState('password');

    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };

    // reset login status
    useEffect(() => {
        // dispatch(userActions.logout());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (first_name && last_name && email && password && company && role) {
            dispatch(userActions.register(inputs));
            setSubmitted(false);
            setInputs(inputs => ({
                ...inputs,
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                company: '',
                role: '',
            }));
        }
    }
    const inputProps = {
        FirstNameInputProps: ({ name, _name, placeholder, defaultValue }) => ({
            className: `${name.replace(/\s/g, '-').toLowerCase()}-class`,
            id: `${name.replace(/\s/g, '-').toLowerCase()}-input`,
            // defaultValue: '',
            labelText: `${name}`,
            name: `${_name.replace(/\s/g, '_').toLowerCase()}`,
            placeholder,
            light: false,
            disabled: false,
            hideLabel: false,
            invalid: false,
            invalidText: `Please enter valid ${name.toLowerCase()}`,
            // warn: false,
            // warnText: 'Warning state text (warnText) This will overwrite your current settings',
            // helperText: 'Optional help text',
            // inline: false,
            onFocus: () => {
                setSubmitted(false);
                dispatch(alertActions.hideToast())
            },
            onClick: () => { },
            onChange: handleChange,
        }),
        select: ({ name, _name, placeholder }) => ({
            className: `${name.replace(/\s/g, '-').toLowerCase()}-class`,
            id: `${name.replace(/\s/g, '-').toLowerCase()}-input`,
            light: false,
            invalid: false,
            invalidText: `Please select valid ${name.toLowerCase()}`,
            labelText: `${name}`,
            name: `${_name.replace(/\s/g, '_').toLowerCase()}`,
            onChange: handleChange,
        }),
        PasswordInputProps: () => ({
            tooltipPosition: 'bottom',
            tooltipAlignment: 'center',
            hidePasswordLabel: 'Hide password',
            showPasswordLabel: 'Show password',
        }),
    };

    const additionalProps = {
        className: 'some-class',
        onSubmit: (e) => {
            e.preventDefault();
            action('FormSubmitted')(e);
        },
    };
    const buttonEvents = {
        className: 'submit-class',
        onClick: handleSubmit,
    };

    return (
        <React.Fragment>
            <div style={{ height: '100vh' }}>
                <Grid style={{ height: '100vh', paddingLeft: 0 }}>
                    <Row style={{ height: '100vh' }}>
                        <Column lg={3} style={{ background: '#000000', color: '#FFFFFF' }}>
                            <LeftComponent />
                        </Column>
                        <Column lg={9}>
                            <div style={{ padding: 80, paddingTop: 50 }}>
                                <Grid>
                                    <Row>
                                        <Column>
                                            <div style={{ marginBottom: 80 }}>
                                                <h5 className="custom-font">Strobes</h5>
                                            </div>
                                            <div style={{ marginBottom: 50 }}>
                                                <h3>Register</h3>
                                                <p style={{ fontSize: 13 }}>Already have an account? <a className="p-cursor" onClick={() => history.push('/login')}>Log in</a></p>
                                            </div>
                                        </Column>
                                    </Row>
                                </Grid>
                                <Grid >
                                    <Row>
                                        <Column lg={6} style={{ marginTop: 8, marginBottom: 8 }}>
                                            <FluidForm>
                                                <TextInput
                                                    type='text'
                                                    {...inputProps.FirstNameInputProps({
                                                        name: 'First Name',
                                                        _name: 'First Name',
                                                        placeholder: 'John',
                                                    })}
                                                    value={first_name || ''}
                                                    invalid={submitted && !first_name}
                                                />
                                            </FluidForm>
                                        </Column>
                                        <Column lg={6} style={{ marginTop: 8, marginBottom: 8 }}>
                                            <FluidForm>
                                                <TextInput
                                                    type='text'
                                                    {...inputProps.FirstNameInputProps({
                                                        name: 'Last Name',
                                                        _name: 'Last Name',
                                                        placeholder: 'Doe',

                                                    })}
                                                    value={last_name || ''}
                                                    invalid={submitted && !last_name}

                                                />
                                            </FluidForm>
                                        </Column>

                                        <Column lg={6} style={{ marginTop: 8, marginBottom: 8 }}>
                                            <FluidForm>
                                                <TextInput
                                                    type='text'
                                                    {...inputProps.FirstNameInputProps({
                                                        name: 'Company',
                                                        _name: 'Company',
                                                        placeholder: 'Acme Corp Inc',
                                                    })}
                                                    value={company || ''}
                                                    invalid={submitted && !company}

                                                />
                                            </FluidForm>
                                        </Column>
                                        <Column lg={6} style={{ marginTop: 8, marginBottom: 8 }}>
                                            <FluidForm>
                                                {/* <TextInput
                                                    type='text'
                                                    {...inputProps.FirstNameInputProps({
                                                        name: 'I am a',
                                                        _name: 'role',
                                                        placeholder: 'select'
                                                    })}
                                                    invalid={submitted && !role}

                                                /> */}
                                                <Select
                                                    style={{ width: '24.6rem', height: '4rem', paddingTop: 18 }}
                                                    {...inputProps.select({
                                                        name: 'I am a',
                                                        _name: 'role',
                                                        placeholder: 'select',
                                                    })}
                                                    value={role || 'placeholder-item'}
                                                    invalid={submitted && !role}
                                                >
                                                    <SelectItem
                                                        disabled
                                                        hidden
                                                        value="placeholder-item"
                                                        text="select"
                                                    />
                                                    <SelectItem value="admin" text="Admin" />
                                                    <SelectItem value="user" text="User" />
                                                </Select>
                                            </FluidForm>
                                        </Column>
                                        <Column lg={6} style={{ marginTop: 8, marginBottom: 8 }}>
                                            <FluidForm>
                                                <TextInput
                                                    type='text'
                                                    {...inputProps.FirstNameInputProps({
                                                        name: 'Email',
                                                        _name: 'Email',
                                                        placeholder: 'john.doe@example.com',
                                                    })}
                                                    value={email || ''}
                                                    invalid={submitted && !email}

                                                />
                                            </FluidForm>
                                        </Column>
                                        <Column lg={6} style={{ marginTop: 8, marginBottom: 8 }}>
                                            <FluidForm>
                                                <TextInput.PasswordInput
                                                    {...inputProps.FirstNameInputProps({
                                                        name: 'Password',
                                                        _name: 'Password',
                                                        placeholder: '******'
                                                    })}
                                                    {...inputProps.PasswordInputProps()}
                                                    value={password || ''}
                                                    invalid={submitted && !password}
                                                />
                                            </FluidForm>
                                        </Column>
                                    </Row>
                                </Grid>
                                <Grid style={{ marginTop: 30 }}>
                                    <Row>
                                        <Column>
                                            <Button style={{ maxWidth: '100%', width: '100%', minHeight: '4rem' }} type="submit" className="some-class" {...buttonEvents}
                                                renderIcon={ArrowRight32} iconDescription="ArrowRight">
                                                Continue to your free account
                                            </Button>
                                            <p style={{ marginTop: 14, fontSize: 12 }}>
                                                By Creating a Strobes account, you consent to and fully accept the our Privacy Policy. Terms of Service apply.
                                            </p>
                                        </Column>
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

RegisterPage.propTypes = {

}

export default RegisterPage
