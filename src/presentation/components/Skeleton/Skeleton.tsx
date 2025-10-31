// presentation/components/Skeleton/Skeleton.tsx

"use client";

import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "./Skeletons.scss";

interface SkeletonEstructuraProps {
    count?: number;
}

const SkeletonEstructura = ({ count = 6 }: SkeletonEstructuraProps) => {
    return (
        <div className='estructura-skeleton'>
            {[...Array(count)].map((_, i) => (
                <div key={i} className="div-de-skeleton">
                    <Skeleton className="skeleto" />
                </div>
            ))}
        </div>
    );
};

export { SkeletonEstructura };
export default SkeletonEstructura;
