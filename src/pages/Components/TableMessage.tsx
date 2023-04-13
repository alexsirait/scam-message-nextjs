import React from 'react';
import { typeMessage } from '../Type/typeMessage';
import Moment from 'react-moment';

const StatusMessage = ({ isStatus }: { isStatus: string | undefined }) => {
	let badgeColor = 'fw-bold btn btn-warning';
	let text = 'Waiting';
	if (isStatus == 'success') {
		badgeColor = 'fw-bold btn btn-success';
		text = 'Success';
	} else if (isStatus == 'failed') {
		badgeColor = 'fw-bold btn btn-danger';
		text = 'Failed';
	}
	return <span className={badgeColor}>{text}</span>;
};

export default function TableMessage({ data }: { data: typeMessage[] }) {
	return (
		<div className="table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl">
			<table className="table table-responsive">
				<thead>
					<tr>
						<th scope="col">No</th>
						<th scope="col">Date</th>
						<th scope="col">Phone</th>
						<th scope="col">Message</th>
						<th scope="col">Status</th>
					</tr>
				</thead>
				<tbody>
					{data.length != 0 ? (
						data?.map((message: typeMessage, index: number) => (
							<tr key={index}>
								<th scope="row">{++index}</th>
								<td>
									<span>
										<Moment toNow>{message.createdAt}</Moment>
									</span>
								</td>
								<td>{message.phoneNumber}</td>
								<td style={{ minWidth: 250 }}>{message.message}</td>
								<td>
									<StatusMessage isStatus={message.status} />
								</td>
							</tr>
						))
					) : (
						<td className="fw-bold" colSpan={5}>
							<div className="p-3">Empty data table ..</div>
						</td>
					)}
				</tbody>
			</table>
		</div>
	);
}
