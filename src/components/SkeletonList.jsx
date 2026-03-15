import React from "react";
import {Skeleton} from "./PizzaBlock/Skeleton";

const SkeletonList = () => {
    return (
        <>
            {[...new Array(4)].map((item, index) => (
                <Skeleton key={index} />
            ))}
        </>
    );
};

export default SkeletonList;