// tslint:disable-next-line:no-shadowed-variable
/**
 * Creates a function that helps naming actions by making the current action prefix fixed
 * @param actionType The type of the action, e.g. Example/API or Example Page
 * @param actionName The name of the action
 */
export const actionNameCreator = (actionType: string) => (actionName: string) => `${actionType} ${actionName};`;
