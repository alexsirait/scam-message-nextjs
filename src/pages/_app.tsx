import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="container p-2 p-lg-5">
				<ToastContainer />
				<div className="p-3">
					<Component {...pageProps} />
				</div>
			</div>
		</QueryClientProvider>
	);
}
