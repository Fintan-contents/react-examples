"use client";

import { Button, Typography } from "antd";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Typography.Title level={2} className={styles.centerText}>
        Sample App for React Cs Component
      </Typography.Title>
      <div className={styles.centerContainer}>
        <Button
          className={styles.button}
          block
          type="default"
          onClick={() => router.push("/demo")}
        >
          デモ画面
        </Button>
      </div>
      <div className={`${styles.centerContainer} ${styles.marginTop}`}>
        <Button
          className={styles.button}
          block
          type="default"
          onClick={() => router.push("/todo")}
        >
          Todoアプリ
        </Button>
      </div>
    </>
  );
}
