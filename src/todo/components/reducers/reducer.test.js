import { todoReducer } from "./reducer"; 
import { ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM, TOGGLE_ITEM, REMOVE_ALL_ITEMS, TOGGLE_ALL, REMOVE_COMPLETED_ITEMS } from "../../constants";
import '@testing-library/jest-dom/extend-expect';

jest.mock("./reducer", () => {
  let count = 0;
  return {
    __esModule: true,
    ...jest.requireActual("./reducer"),
    nanoid: jest.fn(() => `mocked-id-${count++}`),
  };
});

test("should add a new item", () => {
  const initialState = [];
  const action = { type: ADD_ITEM, payload: { title: "New Todo" } };
  const newState = todoReducer(initialState, action);

  expect(newState).toHaveLength(1);
  expect(newState[0].title).toBe("New Todo");
  expect(newState[0].completed).toBeFalsy();
  expect(newState[0].id).toBe("mocked-id-0");
});


test("should update an existing item", () => {
  const initialState = [{ id: "mocked-id-1", title: "Old Todo", completed: false }];
  const action = { type: UPDATE_ITEM, payload: { id: "mocked-id-1", title: "Updated Todo" } };
  const newState = todoReducer(initialState, action);

  expect(newState).toHaveLength(1);
  expect(newState[0].title).toBe("Updated Todo");
});

test("should remove an item", () => {
  const initialState = [{ id: "mocked-id-2", title: "To be removed", completed: false }];
  const action = { type: REMOVE_ITEM, payload: { id: "mocked-id-2" } };
  const newState = todoReducer(initialState, action);

  expect(newState).toHaveLength(0);
});

test("should toggle an item's completion status", () => {
  const initialState = [{ id: "mocked-id-3", title: "Toggle Me", completed: false }];
  const action = { type: TOGGLE_ITEM, payload: { id: "mocked-id-3" } };
  const newState = todoReducer(initialState, action);

  expect(newState[0].completed).toBeTruthy();
});

test("should remove all items", () => {
  const initialState = [{ id: "mocked-id-4", title: "Item 1", completed: false }, { id: "mocked-id-5", title: "Item 2", completed: true }];
  const action = { type: REMOVE_ALL_ITEMS };
  const newState = todoReducer(initialState, action);

  expect(newState).toHaveLength(0);
});

test("should toggle all items' completion status", () => {
  const initialState = [{ id: "mocked-id-6", title: "Item 1", completed: false }, { id: "mocked-id-7", title: "Item 2", completed: false }];
  const action = { type: TOGGLE_ALL, payload: { completed: true } };
  const newState = todoReducer(initialState, action);

  expect(newState).toHaveLength(2);
  expect(newState.every((item) => item.completed)).toBeTruthy();
});

test("should remove all completed items", () => {
  const initialState = [{ id: "mocked-id-8", title: "Item 1", completed: true }, { id: "mocked-id-9", title: "Item 2", completed: false }];
  const action = { type: REMOVE_COMPLETED_ITEMS };
  const newState = todoReducer(initialState, action);

  expect(newState).toHaveLength(1);
  expect(newState[0].completed).toBeFalsy();
});
