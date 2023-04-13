import React from 'react';
import { FiAlertOctagon } from 'react-icons/fi';

export default function HeaderScamMessage({
	isFetching,
}: {
	isFetching: boolean;
}) {
	return (
		<div>
			<div className="d-flex justify-content-between mb-5">
				<div>
					<h1 className="text-danger fw-bold mb-2">
						<span>
							<FiAlertOctagon />
						</span>{' '}
						<span>Scam Message</span>
					</h1>
				</div>
				<div>
					{isFetching && (
						<>
							<span
								className="spinner-border spinner-border-xl text-danger"
								role="status"
								aria-hidden="true"
							></span>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
