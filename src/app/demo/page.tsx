"use client";

import { HomeFilled } from "@ant-design/icons";
import { Divider } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DemoHeader, useHeaderView } from "./DemoAntdHeader";
import DemoMain from "./DemoAntdMain";

const DemoPage = () => {
  const router = useRouter();
  const headerView = useHeaderView();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        <HomeFilled
          onClick={() => router.push("/")}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "40px",
          }}
        />
      </div>
      <DemoHeader view={headerView} />
      <Divider />
      <DemoMain headerView={headerView} />
    </>
  );
};

export default DemoPage;
