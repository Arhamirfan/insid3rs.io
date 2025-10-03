import React, { useEffect, useState } from "react";
import { connectMetakeep } from '../src/services/blockChain/metakeepConnection'
//images
let Index = () => {
    return (
        <>
            <button onClick={async () => {
                let result = await connectMetakeep()
                console.log(result)
            }}>Click</button>
        </>
    );
};

export default Index;