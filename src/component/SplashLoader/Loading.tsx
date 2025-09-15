// app/components/SplashLoader/loading.tsx

"use client";

import animationData from '@/app/lottie/loading.json';
import { useLottie } from "lottie-react";

const Loading = () => {
  const defaultOptions = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(defaultOptions);

  return (
    <>
      <div className="">
        <div className="w-15 h-15">{View}</div>
      </div>
    </>
  );
};

export default Loading;