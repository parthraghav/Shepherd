import React, { useEffect, useState } from "react";

const Delayed = ({
  isMounted,
  delayTime,
  component: Component,
  ...rest
}: any) => {
  const [shouldRender, setShouldRender] = useState(isMounted);
  useEffect(() => {
    if (shouldRender && !isMounted) {
      setTimeout(() => {
        setShouldRender(false);
      }, delayTime);
    } else if (!shouldRender && isMounted) {
      setShouldRender(true);
    }
  }, [isMounted]);
  return shouldRender ? <Component {...rest} /> : <></>;
};

export const DelayUnmounting = (Component: any) => {
  return <Delayed component={Component} />;
};
