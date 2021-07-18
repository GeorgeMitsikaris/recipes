import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import './Navigation.css';
import {
	startLoginGoogle,
	startLoginEmail,
	startSignOut,
	startRegister,
} from '../../store/actions/authActions';
import { useState } from 'react';

function Navigation({
	startLoginGoogle,
	startLoginEmail,
	startSignOut,
	startRegister,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const toggleModal = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	const {
		register,
		handleSubmit,
    getValues,
    reset,
		formState: { errors },
	} = useForm();

  
  const onSubmit = (data, e) => {
    e.preventDefault();
    startRegister(data.username, data.password);
    toggleModal();
    reset();
  }

	const modalHtml = (
		<div className='modal'>
			<h2>Sign in</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='modal-form'>
					<div className='modal-input-wrap'>
						<label>Username</label>
						<input type='text' {...register('username', { required: true })} />
						{errors.username && <span>Username is required</span>}
					</div>
					<div className='modal-input-wrap'>
						<label>Password</label>
						<input
							type='password'
							{...register('password', { required: true })}
						/>
						{errors.password && <span>Password is required</span>}
					</div>
					<div className='modal-input-wrap'>
						<label>Confirm Password</label>
						<input
              type='password'
							{...register('passwordConfirmation', {
								required: 'Please confirm password!',
								validate: {
									matchesPreviousPassword: (value) => {
										const { password } = getValues();
										return password === value || 'Passwords should match!';
									},
								},
							})}
						/>
						{errors.passwordConfirmation && (
							<span>{errors.passwordConfirmation.message}</span>
						)}
					</div>
				</div>
				<div className='modal-buttons'>
					<button type='submit' className='modal-button-action'>
						Register
					</button>
					<button className='modal-button-cancel' onClick={toggleModal}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);

	return (
		<div className='nav'>
			<button className='nav-login' onClick={toggleModal}>
				Register
			</button>
			<button className='nav-login' onClick={toggleModal}>
				Login with Email
			</button>
			<button className='nav-login' onClick={startLoginGoogle}>
				Login with Google
			</button>
			<button className='nav-register' onClick={startSignOut}>
				Sign out
			</button>
			<Modal
				style={{
					content: {
						inset: '230px',
					},
				}}
				isOpen={isOpen}
				closeTimeoutMS={500}
				onRequestClose={() => toggleModal()}
				className='modal-container'
			>
				{modalHtml}
			</Modal>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		startLoginGoogle: () => dispatch(startLoginGoogle()),
		startLoginEmail: (userName, password) =>
			dispatch(startLoginEmail(userName, password)),
		startSignOut: () => dispatch(startSignOut()),
		startRegister: (userName, password) =>
			dispatch(startRegister(userName, password)),
	};
};

export default connect(null, mapDispatchToProps)(Navigation);
