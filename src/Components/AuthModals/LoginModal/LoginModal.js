import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

function LoginModal() {
  const dispatch = useDispatch();
  const isLoginModalOpen = useSelector(state => state.auth.isLoginModalOpen);
  const errorMessage = useSelector(state => state.auth.errorMessage);

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
		dispatch(startLoginEmail(data.username, data.password));
		reset();
	};

	const renderLoginForm = (
		<div className='modal' onClick={() => dispatch(setErrorMessage(''))}>
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
					<button className='modal-button-cancel' onClick={() => dispatch(toggleLoginModal())}>
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
			onRequestClose={() => dispatch(toggleLoginModal())}
			className='modal-container'
		>
			{renderLoginForm}
		</Modal>
	);
}

export default LoginModal;
