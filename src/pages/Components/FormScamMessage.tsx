import React from 'react';
import { typeFormScam } from '../Type/typeFormScam';
import { FiSend } from 'react-icons/fi';

export default function FormScamMessage({
	register,
	errors,
	handleSubmit,
	onSubmit,
	isSubmitting,
}: typeFormScam) {
	return (
		<>
			<div className="col-md-5">
				<div className="card">
					<div className="card-header fw-bold">
						<FiSend /> Request Message
					</div>
					<div className="card-body">
						<form>
							<div className="form-group">
								<label htmlFor="phoneNumber">Phone Number</label>
								<input
									type="number"
									className={`form-control ${
										errors.phoneNumber && 'is-invalid'
									}`}
									id="phoneNumber"
									aria-describedby="phoneNumberHelp"
									placeholder="Enter Phone Number"
									{...register('phoneNumber')}
									name="phoneNumber"
									required
								/>
								<small id="phoneNumberHelp" className="form-text text-muted">
									Well never share your phone number with anyone else.
								</small>
								<div>
									{errors.phoneNumber && (
										<span className="text-danger">
											{errors.phoneNumber.message}
										</span>
									)}
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="message">Message</label>
								<textarea
									className={`form-control ${errors.message && 'is-invalid'}`}
									id="message"
									placeholder="Message"
									{...register('message')}
									name="message"
									required
								/>
							</div>
							<div>
								{errors.message && (
									<span className="text-danger">{errors.message.message}</span>
								)}
							</div>
							<button
								type="submit"
								className="btn btn-primary mt-2 fw-bold"
								onClick={handleSubmit(onSubmit)}
								disabled={isSubmitting}
							>
								<span>
									{isSubmitting && (
										<>
											<span
												className="spinner-border spinner-border-sm"
												role="status"
												aria-hidden="true"
											></span>{' '}
										</>
									)}
									Send
								</span>
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
