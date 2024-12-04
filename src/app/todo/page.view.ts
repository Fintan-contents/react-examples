import {
  CsInputTextItem,
  CsMutateButtonClickEvent,
  CsQueryButtonClickEvent,
  CsQueryLoadEvent,
  CsTextAreaItem,
  CsView,
  RW,
  stringRule,
  useCsInputTextItem,
  useCsTextAreaItem,
  useCsView,
  useInit,
} from "@/framework/logics";
import {
  useCsRqAdvancedMutateButtonClickEvent,
  useCsRqAdvancedQueryButtonClickEvent,
  useCsRqAdvancedQueryLoadEvent,
} from "@/framework/logics/react-query-advanced/CsRqAdvancedEvent";
import {
  ListTodoResponse,
  Todo,
  TodoRegistration,
} from "@/libs/generated/model";
import {
  useDeleteTodo,
  useListTodo,
  usePostTodo,
  usePutTodo,
} from "@/libs/generated/todos/todos";

/**
 * 一覧取得用のView
 */
export type TodoListView = CsView & {
  loadTodo: CsQueryLoadEvent<ListTodoResponse>;
};

/**
 * 一覧取得用のViewの初期化
 *
 * @returns TodoListView 一覧取得用のView
 */
export const useTodoListView = (): TodoListView => {
  return useCsView({
    loadTodo: useCsRqAdvancedQueryLoadEvent(useListTodo()),
  });
};

/**
 * 担当者検索用のView
 */
export type TodoSearchView = CsView & {
  assignee: CsInputTextItem;
  searchTodo: CsQueryButtonClickEvent<ListTodoResponse>;
};

/**
 * 担当者検索用のViewの初期化
 *
 * @param assignee 検索対象の担当者
 * @returns TodoSearchView 担当者検索用のView
 */
export const useTodoSearchView = (): TodoSearchView => {
  const assignee = useCsInputTextItem(
    "担当者",
    useInit(""),
    stringRule(true, 1, 20),
    RW.Editable,
    "検索する担当者を入力してください",
  );
  return useCsView({
    assignee: assignee,
    searchTodo: useCsRqAdvancedQueryButtonClickEvent(
      useListTodo(
        { assignee_eq: assignee.value },
        {
          query: {
            enabled: false,
            refetchOnWindowFocus: false,
          },
        },
      ),
    ),
  });
};

/**
 * 登録用のView
 */
export type TodoCreateView = CsView & {
  title: CsInputTextItem;
  description: CsTextAreaItem;
  assignee: CsInputTextItem;
  createButton: CsMutateButtonClickEvent<
    {
      data: TodoRegistration;
    },
    Todo
  >;
};

/**
 * 登録用のViewの初期化
 *
 * @returns TodoPostView 登録用のView
 */
export const useTodoCreateView = (): TodoCreateView => {
  return useCsView({
    title: useCsInputTextItem(
      "タイトル",
      useInit(""),
      stringRule(true, 1, 20),
      RW.Editable,
      "タイトルを入力してください",
    ),
    description: useCsTextAreaItem(
      "説明",
      useInit(""),
      stringRule(true, 1, 100),
      RW.Editable,
      "タスクの説明を入力してください",
    ),
    assignee: useCsInputTextItem(
      "担当者",
      useInit(""),
      stringRule(true, 1, 20),
      RW.Editable,
      "担当者を入力してください",
    ),
    createButton: useCsRqAdvancedMutateButtonClickEvent(usePostTodo()),
  });
};

/**
 * 更新用のView
 */
export type TodoEditView = CsView & {
  title: CsInputTextItem;
  description: CsTextAreaItem;
  id: CsInputTextItem; // 更新対象を識別するためのID
  assignee: CsInputTextItem;
  updateButton: CsMutateButtonClickEvent<
    {
      todoId: string;
      data: TodoRegistration;
    },
    Todo
  >;
};

/**
 * 更新用のViewの初期化
 *
 * @returns TodoEditView 更新用のView
 */
export const useTodoEditView = (): TodoEditView => {
  return useCsView({
    title: useCsInputTextItem(
      "タイトル",
      useInit(""),
      stringRule(true, 1, 20),
      RW.Editable,
      "タイトルを入力してください",
    ),
    description: useCsTextAreaItem(
      "説明",
      useInit(""),
      stringRule(true, 1, 100),
      RW.Editable,
      "タスクの説明を入力してください",
    ),
    assignee: useCsInputTextItem(
      "担当者",
      useInit(""),
      stringRule(true, 1, 20),
      RW.Editable,
      "担当者を入力してください",
    ),
    // 更新対象を識別するためのID（表示はしない）
    id: useCsInputTextItem("ID", useInit(""), stringRule(false)),
    updateButton: useCsRqAdvancedMutateButtonClickEvent(usePutTodo()),
  });
};

/**
 * 削除用のView
 */
export type TodoDeleteView = CsView & {
  // 削除対象を識別するためのID（表示はしない）
  id: CsInputTextItem;
  deleteButton: CsMutateButtonClickEvent<
    {
      todoId: string;
    },
    Todo
  >;
};

/**
 * 削除用のViewの初期化
 *
 * @returns TodoDeleteView 削除用のView
 */
export const useTodoDeleteView = (): TodoDeleteView => {
  return useCsView({
    id: useCsInputTextItem("ID", useInit(""), stringRule(false)),
    deleteButton: useCsRqAdvancedMutateButtonClickEvent(useDeleteTodo()),
  });
};
