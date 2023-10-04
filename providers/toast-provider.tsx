"use client";

import { Toaster } from "react-hot-toast";

type Props = {};

const ToastProvider = (props: Props) => {
  return <Toaster position="top-center" reverseOrder={false} />;
};

export default ToastProvider;
