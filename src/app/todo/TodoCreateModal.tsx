import {
  AxMutateButton,
  AxInputText,
  AxTextArea,
} from "@/framework/components/antd";
import { Modal } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { useTodoCreateView } from "./page.view";

type Props = {
  isOpenCreateModal: boolean;
  setIsOpenCreateModal: Dispatch<SetStateAction<boolean>>;
  setIsFilter: () => void;
  resetSearchInputArea: () => void;
  reload: () => void;
};
export const TodoCreateModal: React.FC<Props> = (props: Props) => {
  const {
    isOpenCreateModal,
    setIsOpenCreateModal,
    setIsFilter,
    resetSearchInputArea,
    reload,
  } = props;

  const todoPostView = useTodoCreateView();
  todoPostView.createButton.setRequest({
    data: {
      title: todoPostView.title.value ?? "",
      description: todoPostView.description.value ?? "",
      assignee: todoPostView.assignee.value ?? "",
    },
  });
  const setInit = () => {
    todoPostView.title.setValue("");
    todoPostView.description.setValue("");
    todoPostView.assignee.setValue("");
  };
  const onCancel = () => {
    todoPostView.validationEvent?.resetError();
    setInit();
    setIsOpenCreateModal(false);
  };
  const onAfterApiCallSuccess = () => {
    todoPostView.validationEvent?.resetError();
    setInit();
    setIsOpenCreateModal(false);
    setIsFilter();
    resetSearchInputArea();
    reload();
  };

  return (
    <Modal
      open={isOpenCreateModal}
      title="追加"
      onCancel={onCancel}
      footer={
        <AxMutateButton
          event={todoPostView.createButton}
          validationViews={[todoPostView]}
          type="primary"
          onAfterApiCallSuccess={onAfterApiCallSuccess}
        >
          作成
        </AxMutateButton>
      }
    >
      <>
        <AxInputText item={todoPostView.title}></AxInputText>
        <AxTextArea item={todoPostView.description}></AxTextArea>
        <AxInputText item={todoPostView.assignee}></AxInputText>
      </>
    </Modal>
  );
};
