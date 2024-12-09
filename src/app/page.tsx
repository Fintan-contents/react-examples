"use client";

import { Card, List, Typography } from "antd";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { ReactNode } from "react";

type Category = {
  name: string;
  features: Feature[];
};

type Feature = {
  name: string;
  description: ReactNode;
  url: string;
};

const categories: Category[] = [
  {
    name: "省力化コンポーネント（spa-view-item）実装例",
    features: [
      {
        name: "Demo",
        description: (
          <p>
            省力化コンポーネントのデモ画面です。
            <br />
            省力化コンポーネントの特徴を知ることができます。
          </p>
        ),

        url: "/demo",
      },
      {
        name: "Todo App",
        description: (
          <p>
            省力化コンポーネントのCRUDの実装例です。
            <br />
            基本的な実装の仕方を知ることができます。
          </p>
        ),
        url: "/todo",
      },
    ],
  },
];

const FeatureCard = (props: Feature) => {
  const router = useRouter();
  return (
    <Card
      title={props.name}
      hoverable
      onClick={() => router.push(props.url)}
      role="button"
      type={"inner"}
    >
      {props.description}
    </Card>
  );
};

const Features = (props: Category) => {
  const features: ReactNode[] = props.features.map((feature: Feature) => (
    <FeatureCard {...feature} />
  ));
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      dataSource={features}
      renderItem={(item: ReactNode) => <List.Item>{item}</List.Item>}
    />
  );
};

const CategoryCard = () => {
  return categories.map((category: Category) => (
    <Card title={category.name} key={category.name}>
      <Features {...category} />
    </Card>
  ));
};

export default function Home() {
  return (
    <>
      <Typography.Title level={2} className={styles.centerText}>
        Sample App for React
      </Typography.Title>
      <div className={styles.centerContainer}>
        <CategoryCard />
      </div>
    </>
  );
}
