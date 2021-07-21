import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import {
	startRegister,
	toggleRegisterModal,
} from '../../../store/actions/authActions';

function RegisterModal({startRegister, toggleRegisterModal, isRegisterModalOpen}) {

		const {
			register,
			handleSubmit,
			getValues,
			reset,
			formState: { errors },
		} = useForm();

		const onSubmitRegister = (data) => {
			// e.preventDefault();
			startRegister(data.username, data.password);
			toggleRegisterModal();
			reset();
		};

		const renderRegisterForm = (
			<div className='modal'>
				<h2>Register</h2>
				<form onSubmit={handleSubmit(onSubmitRegister)}>
					<div className='modal-form'>
						<div className='modal-input-wrap'>
							<label>Username</label>
							<input
								type='text'
								{...register('username', { required: true })}
							/>
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
						<button
							type='submit'
							className='modal-button-action'
							onClick={toggleRegisterModal}
						>
							Sign up
						</button>
						<button
							className='modal-button-cancel'
							onClick={toggleRegisterModal}
						>
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleRegisterModal: () => dispatch(toggleRegisterModal()),
		startRegister: (username, password) =>
			dispatch(startRegister(username, password)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
