import { getSortedPostsData } from 'lib/posts';
import Layout, { siteTitle } from 'components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Date from 'components/Date';
import styles from 'styles/Home.module.css';
import utilStyles from 'styles/utils.module.css';

// ssg;
export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

// ssr
// export async function getServerSideProps() {
//     const allPostsData = getSortedPostsData();
//     return {
//         props: {
//             allPostsData,
//         },
//     };
// }

// export async function getStaticProps() {
//     const response = await fetch('http://localhost:3000/api/posts')
//         .then((res) => res.json())
//         .then((data) => data.allPostsData);

//     return {
//         props: {
//             allPostsData: response,
//         },
//     };
// }

export default function Home({ allPostsData }) {
    //csr
    // const [allPostsData, setAllPostsData] = useState([]);

    // useEffect(() => {
    //     fetch('/api/posts')
    //         .then((res) => res.json())
    //         .then((data) => setAllPostsData(data.allPostsData));
    // }, []);
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <section
                className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
            >
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </Layout>
    );
}
