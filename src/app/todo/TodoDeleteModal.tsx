import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useTodoDeleteView } from "./page.view";
import { AxButton, AxMutateButton } from "@/framework/components/antd";
import { Modal, Space } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Todo } from "@/libs/generated/model";

type Props = {
  record: Todo | null;
  isOpenDeleteModal: boolean;
  setIsOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  setIsFilter: () => void;
  resetSearchInputArea: () => void;
  reload: () => void;
};
export const TodoDeleteModal: React.FC<Props> = (props: Props) => {
  const {
    record,
    isOpenDeleteModal,
    setIsOpenDeleteModal,
    setIsFilter,
    resetSearchInputArea,
    reload,
  } = props;
  const todoDeleteView = useTodoDeleteView();

  todoDeleteView.deleteButton.setRequest({
    todoId: todoDeleteView.id.value ?? "",
  });

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
    reload();
    resetSearchInputArea();
    setIsFilter();
  };

  useEffect(() => {
    todoDeleteView.id.setValue(record?.id);
    // recordが変更されたら再設定
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record]);
  return (
    <Modal
      open={isOpenDeleteModal}
      title={
        <Space>
          <ExclamationCircleFilled style={{ color: "#faad14" }} />
          確認
        </Space>
      }
      onCancel={() => {
        setIsOpenDeleteModal(false);
      }}
      footer={null}
    >
      タスクを削除します。よろしいですか？
      <Space>
        <AxButton
          onClick={() => {
            setIsOpenDeleteModal(false);
          }}
        >
          キャンセル
        </AxButton>
        <AxMutateButton
          event={todoDeleteView.deleteButton}
          type="primary"
          onAfterApiCallSuccess={() => {
            closeDeleteModal();
          }}
        >
          削除
        </AxMutateButton>
      </Space>
    </Modal>
  );
};
