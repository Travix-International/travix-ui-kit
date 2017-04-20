import * as enzyme from 'enzyme';
import * as enzymeToJson from 'enzyme-to-json';
import React from 'react';
import AutoComplete from '../../../components/autoComplete/autoComplete';
import AutoCompleteItem from '../../../components/autoComplete/autoCompleteItem';

describe('AutoComplete', () => {
  describe('#render()', () => {
    const shallow = enzyme.shallow;
    const shallowToJson = enzymeToJson.shallowToJson;

    it('should render correct autocomplete component', () => {
      const wrapper = shallow(
        <AutoComplete
          name="autocomplete"
        >
          <AutoCompleteItem
            value="value"
          >
            item
          </AutoCompleteItem>
        </AutoComplete>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render correct open autocomplete component', () => {
      const component = shallow(
        <AutoComplete
          name="autocomplete"
        >
          <AutoCompleteItem
            value="value"
          >
            item
          </AutoCompleteItem>
        </AutoComplete>
      );

      component.setState({ open: true });

      expect(shallowToJson(component)).toMatchSnapshot();
    });

    it('should render correct autocomplete component with label', () => {
      const component = shallow(
        <AutoComplete
          label="label"
          name="autocomplete"
        >
          <AutoCompleteItem
            value="value"
          >
            item
          </AutoCompleteItem>
        </AutoComplete>
      );

      expect(shallowToJson(component)).toMatchSnapshot();
    });

    it('should render correct autocomplete component with title item', () => {
      const component = shallow(
        <AutoComplete
          label="label"
          name="autocomplete"
        >
          <AutoCompleteItem
            isTitle
            value="value"
          >
            item
          </AutoCompleteItem>
        </AutoComplete>
      );

      expect(shallowToJson(component)).toMatchSnapshot();
    });

    it('should render correct autocomplete component with highlighting', () => {
      const component = shallow(
        <AutoComplete
          highlighted
          name="autocomplete"
        >
          <AutoCompleteItem
            value="value"
          >
            item
          </AutoCompleteItem>
        </AutoComplete>
      );

      expect(shallowToJson(component)).toMatchSnapshot();
    });

    it('should render correct autocomplete component with default value', () => {
      const component = shallow(
        <AutoComplete
          defaultValue={{ value: 'value' }}
          highlighted
          name="autocomplete"
        >
          <AutoCompleteItem
            value="value"
          >
            item
          </AutoCompleteItem>
        </AutoComplete>
      );

      expect(shallowToJson(component)).toMatchSnapshot();
    });

    it('should not render item child if it not "AutoCompleteItem"', () => {
      const component = shallow(
        <AutoComplete
          name="autocomplete"
        >
          <div/>
        </AutoComplete>
      );

      expect(shallowToJson(component)).toMatchSnapshot();
    });
  });
});
