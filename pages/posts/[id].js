import Head from 'next/head';
import React, { useState } from 'react';
import { getPostData, getAllPostIds } from 'lib/posts';
import Date from 'components/Date';
import utilStyles from '/styles/utils.module.css';
import { MDXRemote } from 'next-mdx-remote';
import CodeBlock from 'components/CodeBlock';
import { useRouter } from 'next/router';
// import Button from '../../components/Button';
import dynamic from 'next/dynamic';
import { siteTitle } from 'pages/_document';

const Button = dynamic(() => import('components/Button'), {
    loading: () => <div>Loading...</div>,
});

export async function getStaticPaths() {
    const paths = getAllPostIds();
    // const paths = [
    //     {
    //         params: {
    //             id: 'ssg-ssr',
    //         },
    //     },
    // ];
    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params, preview }) {
    console.log(`>>>>>> ${preview}`);
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

const components = {
    Button,
    CodeBlock,
};

const ErrorComponent = () => {
    const [error, setError] = useState(false);
    if (error) {
        throw new Error('Error occured');
    }
    const onClickHandler = () => {
        setError(true);
    };
    return (
        <button className="rounded px-2 bg-green-500" onClick={onClickHandler}>
            Error
        </button>
    );
};

function Post({ postData, pathname }) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Head>
                <title>{`${postData.title} - ${siteTitle}`}</title>
            </Head>
            <ErrorComponent />
            <article>
                <span>pathname: {pathname}</span>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                {postData.contentHtml && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: postData.contentHtml,
                        }}
                    />
                )}
                {postData.mdxSource && (
                    <MDXRemote
                        {...postData.mdxSource}
                        components={components}
                    />
                )}
            </article>
        </>
    );
}

export default Post;
