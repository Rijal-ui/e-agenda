// app/components/SplashLoader/loading.tsx

"use client";

import animationData from '@/app/lottie/rotatePhone.json';
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
        <div className="w-35 h-35">{View}</div>
      </div>
    </>
  );
};

export default Loading;