import Image from 'next/image';
import styles from 'styles/Layout.module.css';
import utilStyles from 'styles/utils.module.css';
import Link from 'next/link';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Utterance from './Utterance';

const name = 'Jang Young Ju';

export default function Layout({ children, home }) {
    const [theme, setTheme] = useState(() =>
        typeof window !== 'undefined'
            ? localStorage.getItem('theme') === 'dark'
                ? 'dark'
                : 'light'
            : 'light'
    );

    useEffect(() => {
        if (theme === 'dark') {
            document.querySelector('body').classList.add('dark');
        } else {
            document.querySelector('body').classList.remove('dark');
        }
    }, [theme]);

    const handleClick = () => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            localStorage.setItem('theme', 'light');
            setTheme('light');
        } else {
            localStorage.setItem('theme', 'dark');
            setTheme('dark');
        }
    };
    return (
        <div className="bg-pink-50 dark:bg-black text-gray-800 dark:text-gray-200 h-screen">
            <div className={styles.container}>
                <button className="w-12 px-2" onClick={handleClick}>
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>
                <header className={styles.header}>
                    {home ? (
                        <>
                            <Image
                                priority
                                src="/images/KakaoTalk_20220314_161634147.png"
                                className={utilStyles.borderCircle}
                                height={144}
                                width={144}
                                alt={name}
                            />
                            <h1 className={utilStyles.heading2Xl}>{name}</h1>
                        </>
                    ) : (
                        <>
                            <Link href="/">
                                <a>
                                    <Image
                                        priority
                                        src="/images/KakaoTalk_20220314_161634147.png"
                                        className={utilStyles.borderCircle}
                                        height={108}
                                        width={108}
                                        alt={name}
                                    />
                                </a>
                            </Link>
                            <h2 className={utilStyles.headingLg}>
                                <Link href="/">
                                    <a className={utilStyles.colorInherit}>
                                        {name}
                                    </a>
                                </Link>
                            </h2>
                        </>
                    )}
                </header>
                <main>{children}</main>
                {!home && (
                    <>
                        <Utterance />
                        <div className={styles.backToHome}>
                            <Link href="/">
                                <a>← Back to home</a>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
