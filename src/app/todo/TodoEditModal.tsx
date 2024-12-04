import {
  AxMutateButton,
  AxInputText,
  AxTextArea,
} from "@/framework/components/antd";
import { Modal } from "antd";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useTodoEditView } from "./page.view";
import { Todo } from "@/libs/generated/model";

type Props = {
  record: Todo | null;
  isOpenEditModal: boolean;
  setIsOpenEditModal: Dispatch<SetStateAction<boolean>>;
  setIsFilter: () => void;
  resetSearchInputArea: () => void;
  reload: () => void;
};
export const TodoEditModal: React.FC<Props> = (props: Props) => {
  const {
    record,
    isOpenEditModal,
    setIsOpenEditModal,
    setIsFilter,
    resetSearchInputArea,
    reload,
  } = props;
  const todoEditView = useTodoEditView();

  todoEditView.updateButton.setRequest({
    todoId: todoEditView.id.value ?? "",
    data: {
      title: todoEditView.title.value ?? "",
      description: todoEditView.description.value ?? "",
      assignee: todoEditView.assignee.value ?? "",
    },
  });

  const setRecord = () => {
    todoEditView.id.setValue(record?.id);
    todoEditView.title.setValue(record?.title);
    todoEditView.description.setValue(record?.description);
    todoEditView.assignee.setValue(record?.assignee);
  };

  const closeEditModal = () => {
    todoEditView.validationEvent?.resetError();
    setIsOpenEditModal(false);
  };

  const onCancel = () => {
    setRecord();
    closeEditModal();
  };

  const onAfterApiCallSuccess = () => {
    closeEditModal();
    reload();
    resetSearchInputArea();
    setIsFilter();
  };

  useEffect(() => {
    setRecord();
    // recordが変更されたら再設定
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record]);

  return (
    <Modal
      open={isOpenEditModal}
      title="更新"
      onCancel={onCancel}
      footer={
        <AxMutateButton
          event={todoEditView.updateButton}
          validationViews={[todoEditView]}
          type="primary"
          onAfterApiCallSuccess={onAfterApiCallSuccess}
        >
          更新
        </AxMutateButton>
      }
    >
      <>
        <AxInputText item={todoEditView.title}></AxInputText>
        <AxTextArea item={todoEditView.description}></AxTextArea>
        <AxInputText item={todoEditView.assignee}></AxInputText>
      </>
    </Modal>
  );
};
