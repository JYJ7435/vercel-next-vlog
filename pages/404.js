import Link from 'next/link';
import React from 'react';

export default function NotFound() {
    return (
        <>
            <div>찾을 수 없는 페이지 입니다. (URL을 확인해 주세요)</div>
            <Link href="/">
                <a>홈으로..</a>
            </Link>
        </>
    );
}
