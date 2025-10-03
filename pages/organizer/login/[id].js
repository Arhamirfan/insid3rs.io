import React from 'react';
import dynamic from 'next/dynamic'
let LoginWithEmail = dynamic(() => import('../../../src/components/features/organizerLogin'), {
    ssr: false,
})
let OrganizerLogin = () => {
    return (
        <>
            <LoginWithEmail />
        </>
    )
}

export default OrganizerLogin