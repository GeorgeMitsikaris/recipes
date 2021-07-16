import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
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

	const registration = () => {
		startRegister();
		toggleModal();
	};

	const modalHtml = (
		<div className='modal'>
			<h2>Sign in</h2>
			<div className='modal-form'>
				<div className='modal-input-wrap'>
					<label>Username</label>
					<input type='text' />
				</div>
				<div className='modal-input-wrap'>
					<label>Password</label>
					<input type='text' />
				</div>
				<div className='modal-input-wrap'>
					<label>Confirm Password</label>
					<input type='text' />
				</div>
			</div>
			<div className='modal-buttons'>
				<button className='modal-button-action' onClick={() => registration()}>
					Register
				</button>
				<button className='modal-button-cancel' onClick={toggleModal}>
					Cancel
				</button>
			</div>
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
