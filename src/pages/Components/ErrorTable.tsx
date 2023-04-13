import React from 'react';

export default function ErrorTable() {
	return (
		<p className="fw-bold text-primary">
			<span
				className="spinner-border spinner-border-sm"
				role="status"
				aria-hidden="true"
			></span>{' '}
			There was an error processing your request ..
		</p>
	);
}
