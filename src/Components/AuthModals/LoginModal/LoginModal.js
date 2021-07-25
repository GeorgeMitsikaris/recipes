import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from 'react-modal';
import './LoginModal.css';

import {
	startLoginEmail,
	toggleLoginModal,
	setErrorMessage,
} from '../../../store/actions/authActions';

function LoginModal({
	startLoginEmail,
	toggleLoginModal,
	isLoginModalOpen,
	errorMessage,
	setErrorMessage,
}) {
	let schema = yup.object().shape({
		username: yup.string().email('Username must be an email').required('Username is required'),
		password: yup
			.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Password is required'),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	const onSubmitLogin = (data) => {
		startLoginEmail(data.username, data.password);
		reset();
	};

	const renderLoginForm = (
		<div className='modal' onClick={() => setErrorMessage('')}>
			<h2>Log in</h2>
			<form onSubmit={handleSubmit(onSubmitLogin)}>
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
						<span>{errorMessage}</span>
					</div>
				</div>
				<div className='modal-buttons'>
					<button type='submit' className='modal-button-action'>
						Log in
					</button>
					<button className='modal-button-cancel' onClick={toggleLoginModal}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);

	return (
		<Modal
			isOpen={isLoginModalOpen}
			closeTimeoutMS={500}
			onRequestClose={() => toggleLoginModal()}
			className='modal-container'
		>
			{renderLoginForm}
		</Modal>
	);
}

const mapStateToProps = (state) => {
	return {
		isLoginModalOpen: state.auth.isLoginModalOpen,
		errorMessage: state.auth.errorMessage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleLoginModal: () => dispatch(toggleLoginModal()),
		startLoginEmail: (username, password) =>
			dispatch(startLoginEmail(username, password)),
		setErrorMessage: (message) => dispatch(setErrorMessage(message)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
