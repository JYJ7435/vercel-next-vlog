import Head from 'next/head';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

export default function Write() {
    const idRef = useRef();
    const titleRef = useRef();
    const contentRef = useRef();

    const [showContent, setShowContent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const id = idRef.current.value;
        const title = titleRef.current.value;
        const content = contentRef.current.value;

        if (id && title && content) {
            fetch('/api/post', {
                method: 'POST',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    title,
                    content,
                }),
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error('Fetch Error');
                })
                .then((data) => {
                    setShowContent(true);
                    alert(data.message);
                })
                .catch((error) => alert(`request error: ${error}`));
        }
    };
    return (
        <>
            <Head>
                <title>Post Write..</title>
            </Head>
            <article>
                <h1>Write a Post!!</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="id"
                        placeholder="id"
                        required
                        ref={idRef}
                    />
                    <br />
                    <br />
                    <input
                        type="text"
                        name="title"
                        placeholder="title"
                        required
                        ref={titleRef}
                    />
                    <br />
                    <br />
                    <textarea
                        type="text"
                        name="content"
                        placeholder="content"
                        required
                        ref={contentRef}
                    />
                    <br />
                    <br />
                    <button className="rounded bg-pink-500 px-2" type="submit">
                        Submit
                    </button>
                </form>
                {showContent && (
                    <Link href={`/posts/${idRef.current.value}`}>
                        <a>Created Post</a>
                    </Link>
                )}
            </article>
        </>
    );
}
