import Head from 'next/head';
import WeatherCheck from '@/src/components/WeatherCheck';

const Root = (): JSX.Element => (
    <>
        <Head>
            <title>Weather Check</title>
            <meta name="description" content="Weather Check Application" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <WeatherCheck></WeatherCheck>
    </>
);

export default Root;
