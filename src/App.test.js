import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from "./App";

describe("App component", () => {
  let wrapper;

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("renders Todo List title", () => {
    expect(wrapper.find("h1").text()).toContain("Todo List");
  });

  it("renders add item input and button", () => {
    expect(wrapper.find("input[placeholder='Add item']").length).toEqual(1);
    expect(wrapper.find("button.ant-btn-primary").text()).toContain("Add");
  });

  it("adds item to the list", () => {
    const input = wrapper.find("input[placeholder='Add item']");
    const button = wrapper.find("button.ant-btn-primary");

    input.simulate("change", { target: { value: "Test Item" } });
    button.simulate("click");

    const listItems = wrapper.find(".list .ant-list-item");
    expect(listItems).toHaveLength(1);
    expect(listItems.at(0).text()).toContain("Test Item");
  });

  it("edits item in the list", () => {
    const input = wrapper.find("input[placeholder='Add item']");
    const button = wrapper.find("button.ant-btn-primary");

    input.simulate("change", { target: { value: "Test Item" } });
    button.simulate("click");

    const editButton = wrapper.find(".list .ant-list-item .anticon-edit");
    editButton.simulate("click");

    const editInput = wrapper.find(".list .ant-list-item .ant-input");
    const editSaveButton = wrapper.find(".list .ant-list-item button.ant-btn");
    editInput.simulate("change", { target: { value: "Updated Item" } });
    editSaveButton.simulate("click");

    const listItems = wrapper.find(".list .ant-list-item");
    expect(listItems).toHaveLength(1);
    expect(listItems.at(0).text()).toContain("Updated Item");
  });

  it("removes item from the list", () => {
    const input = wrapper.find("input[placeholder='Add item']");
    const button = wrapper.find("button.ant-btn-primary");

    input.simulate("change", { target: { value: "Test Item" } });
    button.simulate("click");

    const deleteButton = wrapper.find(".list .ant-list-item .anticon-delete");
    deleteButton.simulate("click");

    const listItems = wrapper.find(".list .ant-list-item");
    expect(listItems).toHaveLength(0);
  });
});
