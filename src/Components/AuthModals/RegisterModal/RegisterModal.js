import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from 'react-modal';
import './RegisterModal.css';

import {
	startRegister,
	toggleRegisterModal,
	setErrorMessage,
} from '../../../store/actions/authActions';

function RegisterModal({
	startRegister,
	toggleRegisterModal,
	isRegisterModalOpen,
	errorMessage,
	setErrorMessage,
}) {

  let schema = yup.object().shape({
		username: yup.string().email('Username must be an email').required('Username is required'),
		password: yup
			.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Password is required'),
		passwordConfirmation: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Passwords must match'),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

	const onSubmitRegister = (data) => {
		startRegister(data.username, data.password);
		reset();
	};

	const renderRegisterForm = (
		<div className='modal' onClick={() => setErrorMessage('')}>
			<h2>Register</h2>
			<form onSubmit={handleSubmit(onSubmitRegister)}>
				<div className='modal-form'>
					<div className='modal-input-wrap'>
						<label>Username</label>
						<input type='text' name='username' {...register('username')} />
						<span>{errors.username?.message}</span>
					</div>
					<div className='modal-input-wrap'>
						<label>Password</label>
						<input type='password' name='password' {...register('password')} />
						<span>{errors.password?.message}</span>
					</div>
					<div className='modal-input-wrap'>
						<label>Confirm Password</label>
						<input
							type='password'
							name='passwordConfirmation'
							{...register('passwordConfirmation')}
						/>
						<span>{errors.passwordConfirmation?.message}</span>
						<span>{errorMessage}</span>
					</div>
				</div>
				<div className='modal-buttons'>
					<button
						type='submit'
						className='modal-button-action'
						onClick={toggleRegisterModal}
					>
						Sign up
					</button>
					<button className='modal-button-cancel' onClick={toggleRegisterModal}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
	return (
		<Modal
			isOpen={isRegisterModalOpen}
			closeTimeoutMS={500}
			onRequestClose={() => toggleRegisterModal()}
			className='modal-container'
		>
			{renderRegisterForm}
		</Modal>
	);
}

const mapStateToProps = (state) => {
	return {
		isRegisterModalOpen: state.auth.isRegisterModalOpen,
		errorMessage: state.auth.errorMessage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleRegisterModal: () => dispatch(toggleRegisterModal()),
		startRegister: (username, password) =>
			dispatch(startRegister(username, password)),
		setErrorMessage: (message) => dispatch(setErrorMessage(message)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
