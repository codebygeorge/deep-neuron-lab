export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  isDeleted?: boolean;
  deletedOn?: number;
  /** Important
   * This is necessary because API is just returns fake 'todo' without actually adding it to db.
   * Using returned Id later in other APIs(edit/delete) will cause 404 error.
   * So key is added to indicate it and handle actions locally only. */
  isLocal?: boolean;
};
