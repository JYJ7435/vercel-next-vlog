import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import ErrorBoundary from 'components/ErrorBoundary';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [visitedTime] = useState(new Date());

    return (
        <Layout home={router.pathname === '/'}>
            <div>
                VisitedTime:{' '}
                {formatDistanceToNow(new Date(visitedTime), {
                    addSuffix: true,
                    includeSeconds: true,
                })}
            </div>
            <ErrorBoundary fallbackComponent={<div>FallbackComponent!!</div>}>
                <Component {...pageProps} pathname={router.pathname} />
            </ErrorBoundary>
        </Layout>
    );
}

export default MyApp;
