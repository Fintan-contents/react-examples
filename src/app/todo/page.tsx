"use client";

import {
  AxButton,
  AxInputText,
  AxQueryButton,
} from "@/framework/components/antd";
import { ListTodoResponse, Todo } from "@/libs/generated/model";
import { DeleteOutlined, EditOutlined, HomeFilled } from "@ant-design/icons";
import { Divider, Space, Table, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useTodoListView, useTodoSearchView } from "./page.view";
import { TodoCreateModal } from "./TodoCreateModal";
import { TodoEditModal } from "./TodoEditModal";
import { TodoDeleteModal } from "./TodoDeleteModal";
import { useState } from "react";

const TodoPage = () => {
  const router = useRouter();

  // モーダルの表示状態
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  // フィルターの有無
  const [isFilter, setIsFilter] = useState<boolean>(false);

  // 選択中のレコード
  const [record, setRecord] = useState<Todo | null>(null);

  // イベント用のViewを参照
  const todoListView = useTodoListView();
  const todoSearchView = useTodoSearchView();

  // 一覧取得
  const todoList = todoListView.loadTodo.response ?? [];

  // 検索結果取得
  const [searchResult, setSearchResult] = useState<ListTodoResponse>();

  // Todoのカラム設定
  const columns = [
    {
      title: "タイトル",
      dataIndex: "title",
      key: "title",
      width: "20%",
    },
    {
      title: "説明",
      dataIndex: "description",
      key: "description",
      width: "50%",
    },
    {
      title: "担当者",
      dataIndex: "assignee",
      key: "assignee",
      width: "20%",
    },
    {
      title: "操作",
      key: "action",
      width: "10%",
      render: (_: string, record: Todo) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <AxButton
            type="primary"
            onClick={() => {
              setRecord(record);
              setIsOpenEdit(true);
            }}
            antdProps={{ shape: "circle" }}
          >
            <EditOutlined />
          </AxButton>
          <AxButton
            type="primary"
            onClick={() => {
              setRecord(record);
              setIsOpenDelete(true);
            }}
            antdProps={{ shape: "circle" }}
          >
            <DeleteOutlined />
          </AxButton>
        </div>
      ),
    },
  ];

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
      <div>
        <Typography.Title level={3} style={{ margin: "10px" }}>
          TODOリスト
        </Typography.Title>
        <Divider variant="solid" />
        <Space
          style={{
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <AxInputText
            item={todoSearchView.assignee}
            hideLabel
            antdProps={{ style: { width: 500 } }}
          />
          <AxQueryButton
            type="primary"
            event={todoSearchView.searchTodo}
            validationViews={[todoSearchView]}
            onBeforeApiCall={() => {
              todoSearchView.validationEvent?.resetError();
            }}
            onAfterApiCallSuccess={() => {
              setIsFilter(true);
              setSearchResult(todoSearchView.searchTodo.response);
            }}
            addClassNames={["vertical-center"]}
          >
            検索
          </AxQueryButton>
          <AxButton
            type="primary"
            onClick={() => {
              if (isFilter) {
                todoSearchView.assignee.setValue("");
                todoListView.loadTodo.reload();
                setIsFilter(false);
              }
            }}
            antdProps={{ disabled: !isFilter }}
            disabledReason="フィルターがかかっていません"
          >
            フィルターリセット
          </AxButton>
        </Space>
        <Divider variant="solid" />
        <AxButton
          onClick={() => {
            setIsOpenCreate(true);
          }}
          type="primary"
          antdProps={{ style: { marginBottom: "30px" } }}
        >
          ＋タスクを追加
        </AxButton>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={isFilter ? searchResult : todoList}
          pagination={false}
          loading={todoListView.isLoading}
        />
      </div>
      <TodoCreateModal
        isOpenCreateModal={isOpenCreate}
        setIsOpenCreateModal={setIsOpenCreate}
        setIsFilter={() => setIsFilter(false)}
        resetSearchInputArea={() => todoSearchView.assignee.setValue("")}
        reload={() => todoListView.loadTodo.reload()}
      />
      <TodoEditModal
        record={record}
        isOpenEditModal={isOpenEdit}
        setIsOpenEditModal={setIsOpenEdit}
        setIsFilter={() => setIsFilter(false)}
        resetSearchInputArea={() => todoSearchView.assignee.setValue("")}
        reload={() => todoListView.loadTodo.reload()}
      />
      <TodoDeleteModal
        record={record}
        isOpenDeleteModal={isOpenDelete}
        setIsOpenDeleteModal={setIsOpenDelete}
        setIsFilter={() => setIsFilter(false)}
        resetSearchInputArea={() => todoSearchView.assignee.setValue("")}
        reload={() => todoListView.loadTodo.reload()}
      />
    </>
  );
};

export default TodoPage;
