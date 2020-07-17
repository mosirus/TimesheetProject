module.exports = {
  GET_PROJECT_LIST: 'Projects?page=1&size=25',
  GET_PROJECT: 'Projects/{id}',
  CREATE_PROJECT: 'Projects',
  DELETE_PROJECT: 'Projects/{id}',
  EDIT_PROJECT: 'Projects/{id}',
  GET_TASK: 'TaskProject/{id}',
  CREATE_TASK: 'Task',
  EDIT_TASK: 'Task/{id}',
  DELETE_TASK: 'Task/{id}',
  GET_EMPLOYEE: 'accounts?page=1&size=25&order=%7B%7D&filter=%7B%7D',
  TASK_DONE : 'TimeSheet',
  GET_TASK_TIMESHEET: 'TimeSheet/Project/{id}',
};