/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * React CS Example
 * OpenAPI for example of React Cost Savings Component
 * OpenAPI spec version: 1.0.0
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type {
  BadRequestResponse,
  ListTodoParams,
  ListTodoResponse,
  NotFoundResponse,
  Todo,
  TodoRegistration
} from '.././model'
import { backendCustomInstance } from '../../backend/customInstance';
import type { ErrorType } from '../../backend/customInstance';



/**
 * List todo
 * @summary List todo
 */
export const listTodo = (
    params?: ListTodoParams,
 signal?: AbortSignal
) => {
      
      
      return backendCustomInstance<ListTodoResponse>(
      {url: `/todos`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getListTodoQueryKey = (params?: ListTodoParams,) => {
    return [`/todos`, ...(params ? [params]: [])] as const;
    }

    
export const getListTodoQueryOptions = <TData = Awaited<ReturnType<typeof listTodo>>, TError = ErrorType<BadRequestResponse>>(params?: ListTodoParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listTodo>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListTodoQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof listTodo>>> = ({ signal }) => listTodo(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listTodo>>, TError, TData> & { queryKey: QueryKey }
}

export type ListTodoQueryResult = NonNullable<Awaited<ReturnType<typeof listTodo>>>
export type ListTodoQueryError = ErrorType<BadRequestResponse>


export function useListTodo<TData = Awaited<ReturnType<typeof listTodo>>, TError = ErrorType<BadRequestResponse>>(
 params: undefined |  ListTodoParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof listTodo>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listTodo>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useListTodo<TData = Awaited<ReturnType<typeof listTodo>>, TError = ErrorType<BadRequestResponse>>(
 params?: ListTodoParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listTodo>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listTodo>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useListTodo<TData = Awaited<ReturnType<typeof listTodo>>, TError = ErrorType<BadRequestResponse>>(
 params?: ListTodoParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listTodo>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
/**
 * @summary List todo
 */

export function useListTodo<TData = Awaited<ReturnType<typeof listTodo>>, TError = ErrorType<BadRequestResponse>>(
 params?: ListTodoParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listTodo>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListTodoQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Create todo
 * @summary Create todo
 */
export const postTodo = (
    todoRegistration: TodoRegistration,
 ) => {
      
      
      return backendCustomInstance<Todo>(
      {url: `/todos`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: todoRegistration
    },
      );
    }
  


export const getPostTodoMutationOptions = <TError = ErrorType<BadRequestResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postTodo>>, TError,{data: TodoRegistration}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postTodo>>, TError,{data: TodoRegistration}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postTodo>>, {data: TodoRegistration}> = (props) => {
          const {data} = props ?? {};

          return  postTodo(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostTodoMutationResult = NonNullable<Awaited<ReturnType<typeof postTodo>>>
    export type PostTodoMutationBody = TodoRegistration
    export type PostTodoMutationError = ErrorType<BadRequestResponse>

    /**
 * @summary Create todo
 */
export const usePostTodo = <TError = ErrorType<BadRequestResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postTodo>>, TError,{data: TodoRegistration}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof postTodo>>,
        TError,
        {data: TodoRegistration},
        TContext
      > => {

      const mutationOptions = getPostTodoMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Get todo
 * @summary Get todo
 */
export const getTodo = (
    todoId: string,
 signal?: AbortSignal
) => {
      
      
      return backendCustomInstance<Todo>(
      {url: `/todos/${todoId}`, method: 'GET', signal
    },
      );
    }
  

export const getGetTodoQueryKey = (todoId: string,) => {
    return [`/todos/${todoId}`] as const;
    }

    
export const getGetTodoQueryOptions = <TData = Awaited<ReturnType<typeof getTodo>>, TError = ErrorType<NotFoundResponse>>(todoId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTodo>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTodoQueryKey(todoId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTodo>>> = ({ signal }) => getTodo(todoId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(todoId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getTodo>>, TError, TData> & { queryKey: QueryKey }
}

export type GetTodoQueryResult = NonNullable<Awaited<ReturnType<typeof getTodo>>>
export type GetTodoQueryError = ErrorType<NotFoundResponse>


export function useGetTodo<TData = Awaited<ReturnType<typeof getTodo>>, TError = ErrorType<NotFoundResponse>>(
 todoId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTodo>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getTodo>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useGetTodo<TData = Awaited<ReturnType<typeof getTodo>>, TError = ErrorType<NotFoundResponse>>(
 todoId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTodo>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getTodo>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useGetTodo<TData = Awaited<ReturnType<typeof getTodo>>, TError = ErrorType<NotFoundResponse>>(
 todoId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTodo>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
/**
 * @summary Get todo
 */

export function useGetTodo<TData = Awaited<ReturnType<typeof getTodo>>, TError = ErrorType<NotFoundResponse>>(
 todoId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTodo>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetTodoQueryOptions(todoId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Update todo
 * @summary Update todo
 */
export const putTodo = (
    todoId: string,
    todoRegistration: TodoRegistration,
 ) => {
      
      
      return backendCustomInstance<Todo>(
      {url: `/todos/${todoId}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: todoRegistration
    },
      );
    }
  


export const getPutTodoMutationOptions = <TError = ErrorType<NotFoundResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putTodo>>, TError,{todoId: string;data: TodoRegistration}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putTodo>>, TError,{todoId: string;data: TodoRegistration}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putTodo>>, {todoId: string;data: TodoRegistration}> = (props) => {
          const {todoId,data} = props ?? {};

          return  putTodo(todoId,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutTodoMutationResult = NonNullable<Awaited<ReturnType<typeof putTodo>>>
    export type PutTodoMutationBody = TodoRegistration
    export type PutTodoMutationError = ErrorType<NotFoundResponse>

    /**
 * @summary Update todo
 */
export const usePutTodo = <TError = ErrorType<NotFoundResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putTodo>>, TError,{todoId: string;data: TodoRegistration}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof putTodo>>,
        TError,
        {todoId: string;data: TodoRegistration},
        TContext
      > => {

      const mutationOptions = getPutTodoMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Delete todo
 * @summary Delete todo
 */
export const deleteTodo = (
    todoId: string,
 ) => {
      
      
      return backendCustomInstance<Todo>(
      {url: `/todos/${todoId}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteTodoMutationOptions = <TError = ErrorType<NotFoundResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteTodo>>, TError,{todoId: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteTodo>>, TError,{todoId: string}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteTodo>>, {todoId: string}> = (props) => {
          const {todoId} = props ?? {};

          return  deleteTodo(todoId,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteTodoMutationResult = NonNullable<Awaited<ReturnType<typeof deleteTodo>>>
    
    export type DeleteTodoMutationError = ErrorType<NotFoundResponse>

    /**
 * @summary Delete todo
 */
export const useDeleteTodo = <TError = ErrorType<NotFoundResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteTodo>>, TError,{todoId: string}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof deleteTodo>>,
        TError,
        {todoId: string},
        TContext
      > => {

      const mutationOptions = getDeleteTodoMutationOptions(options);

      return useMutation(mutationOptions);
    }
    