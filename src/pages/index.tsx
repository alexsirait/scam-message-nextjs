import Head from 'next/head';
import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import TableMessage from './Components/TableMessage';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { typeMessage } from './Type/typeMessage';
import HeaderScamMessage from './Components/HeaderScamMessage';
import ErrorTable from './Components/ErrorTable';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormScamMessage from './Components/FormScamMessage';

const getMessage = async () => {
	const URL = 'http://localhost:3000/api/message';
	const res = await fetch(URL);
	return await res.json();
};

const submitMessage = async (data: typeMessage) => {
	const URL = 'http://localhost:3000/api/message';
	const res = await fetch(URL, { method: 'POST', body: JSON.stringify(data) });
	if (!res.ok) {
		return new Error('Invalid ...');
	}
	return await res.json();
};

export default function Home() {
	const queryClient = useQueryClient();

	const { data, isSuccess, isError, isFetching } = useQuery(
		'message',
		getMessage,
		{
			staleTime: 15000,
			refetchInterval: 15000,
		}
	);

	const mutation = useMutation(submitMessage, {
		onMutate: async (newMessage) => {
			await queryClient.cancelQueries('message');
			const prevMessage = queryClient.getQueryData<typeMessage[]>('message');
			if (prevMessage) {
				newMessage = { ...newMessage, createdAt: new Date().toISOString() };
				const finalMessage = [...prevMessage, newMessage];
				queryClient.setQueryData<typeMessage[]>('message', finalMessage);
				reset();
				return toast.success('Success Notification !');
			} else {
				{
					prevMessage;
				}
				reset();
				return toast.success('Success Notification !');
			}
		},
		onSettled: async (data: any, error: any) => {
			if (data) {
				await queryClient.invalidateQueries('message');
				clearErrors();
			}

			if (error) {
				return toast.error('Error :(');
			}
		},
		onSuccess: async () => {
			clearErrors();
		},
		onError: async (_variables, context: any) => {
			toast.error('Error :(');
			if (context?.prevMessage) {
				queryClient.setQueryData<typeMessage[]>('message', context.prevMessage);
			}
			reset();
		},
	});

	const schema = yup.object().shape({
		phoneNumber: yup
			.string()
			.required('Phone Number is a required field ..')
			.matches(
				/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
				'Phone number is not valid'
			),
		message: yup
			.string()
			.required('Message is a required field ..')
			.min(2, 'Message must be at least 2 char ..'),
	});

	const {
		register,
		handleSubmit,
		reset,
		clearErrors,
		formState: { isSubmitting, errors },
	} = useForm<typeMessage>({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: typeMessage) => {
		await mutation.mutate(data);
	};

	return (
		<>
			<Head>
				<title>⚠️ Scam Message</title>
			</Head>
			<main>
				<HeaderScamMessage isFetching={isFetching} />
				<div className="row">
					<FormScamMessage
						{...{ register, errors, handleSubmit, onSubmit, isSubmitting }}
					/>
					<div className="col-md-7 card p-4 mt-4 mt-md-0">
						{isSuccess && <TableMessage data={data} />}
						{isError && <ErrorTable />}
					</div>
				</div>
			</main>
		</>
	);
}
