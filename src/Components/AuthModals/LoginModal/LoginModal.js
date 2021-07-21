import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

import { startLoginEmail, toggleLoginModal } from '../../../store/actions/authActions';

function LoginModal({ startLoginEmail, toggleLoginModal, isLoginModalOpen }) {

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmitLogin = (data) => {
		// e.preventDefault();
		startLoginEmail(data.username, data.password);
		toggleLoginModal();
		reset();
	};

	const renderLoginForm = (
		<div className='modal'>
			<h2>Sign in</h2>
			<form onSubmit={handleSubmit(onSubmitLogin)}> 
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
			style={{
				content: {
					inset: '230px',
				},
			}}
			isOpen={isLoginModalOpen}
			closeTimeoutMS={500}
			onRequestClose={() => toggleLoginModal()}
			className='modal-container'
		>
			{renderLoginForm}
		</Modal>
	);
}

const mapStateToProps = state => {
  return {
    isLoginModalOpen: state.auth.isLoginModalOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
		toggleLoginModal: () => dispatch(toggleLoginModal()),
		startLoginEmail: (username, password) =>
			dispatch(startLoginEmail(username, password)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
