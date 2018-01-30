import { shallow, mount } from 'enzyme';
import React from 'react';
import LoadingOverlay from '../../../components/loadingOverlay/loadingOverlay';
import Spinner from '../../../components/spinner/spinner';

describe('LoadingOverlay', () => {
  describe('#render()', () => {
    it('render basic loading overlay', () => {
      const wrapper = shallow(
        <LoadingOverlay>
          Some data
        </LoadingOverlay>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('render loading overlay with custom class', () => {
      const wrapper = shallow(
        <LoadingOverlay className="my-custom-class">
          Some data
        </LoadingOverlay>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('render loading overlay with transparency', () => {
      const wrapper = shallow(
        <LoadingOverlay className="my-custom-class" transparency>
          Some data
        </LoadingOverlay>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('render loading overlay in loading mode', () => {
      const wrapper = shallow(
        <LoadingOverlay className="my-custom-class" loading>
          Data is loading...
        </LoadingOverlay>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('render loading overlay with transparency in loading mode', () => {
      const wrapper = shallow(
        <LoadingOverlay className="my-custom-class" loading transparency>
          Data is loading... You can see that message.
        </LoadingOverlay>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('render loading overlay with left message direction', () => {
      const wrapper = shallow(
        <LoadingOverlay className="my-custom-class" loading messageDirection="left">
          Data is loading...
        </LoadingOverlay>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('render loading overlay with loading message', () => {
      const wrapper = shallow(
        <LoadingOverlay className="my-custom-class" loading message="Loading your data...">
          Data is loading...
        </LoadingOverlay>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('render without spinner', () => {
      const wrapper = shallow(
        <LoadingOverlay className="my-custom-class" loading spinner={false}>
          Data is loading...
        </LoadingOverlay>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('render without children - should return null', () => {
      const wrapper = shallow(
        <LoadingOverlay className="my-custom-class" loading message="Loading your data..." />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should show loading container, once loading finished, show just content', () => {
      const wrapper = mount(
        <LoadingOverlay loading message="Loading your data...">
          Data is loading...
        </LoadingOverlay>
      );

      const container = wrapper.find('.ui-loading-overlay');
      let loadingContainer = wrapper.find('.ui-loading-overlay__loading-container');
      let content = wrapper.find('.ui-loading-overlay__content');
      let spinner = wrapper.find(Spinner);

      expect(container.hasClass('ui-loading-overlay_loading')).toEqual(true);
      expect(loadingContainer).toHaveLength(1);
      expect(content).toHaveLength(1);
      expect(content.text()).toEqual('Data is loading...');
      expect(spinner).toHaveLength(1);

      wrapper.setProps({ loading: false });

      // we need to recheck the toggling elements in the updated tree

      loadingContainer = wrapper.find('.ui-loading-overlay__loading-container');
      content = wrapper.find('.ui-loading-overlay__content');
      spinner = wrapper.find(Spinner);

      expect(container.render().hasClass('ui-loading-overlay_loading')).toEqual(false);
      expect(loadingContainer).toHaveLength(0);
      expect(content).toHaveLength(1);
      expect(content.text()).toEqual('Data is loading...');
      expect(spinner).toHaveLength(0);
    });

    it('should handle toggling transparency', () => {
      const wrapper = mount(
        <LoadingOverlay loading>
          Data is loading...
        </LoadingOverlay>
      );

      const container = wrapper.find('.ui-loading-overlay');

      expect(container.hasClass('ui-loading-overlay_transparent')).toEqual(false);

      wrapper.setProps({ transparency: true });

      expect(container.render().hasClass('ui-loading-overlay_transparent')).toEqual(true);

      wrapper.setProps({ transparency: false });

      expect(container.render().hasClass('ui-loading-overlay_transparent')).toEqual(false);
    });

    it('should handle toggling spinner', () => {
      const wrapper = mount(
        <LoadingOverlay loading>
          Data is loading...
        </LoadingOverlay>
      );

      expect(wrapper.find(Spinner)).toHaveLength(1);

      wrapper.setProps({ spinner: false });

      expect(wrapper.find(Spinner)).toHaveLength(0);

      wrapper.setProps({ spinner: true });

      expect(wrapper.find(Spinner)).toHaveLength(1);
    });

    it('should handle toggling loading message & its direction; set right direction by default', () => {
      const wrapper = mount(
        <LoadingOverlay loading>
          Data is loading...
        </LoadingOverlay>
      );

      expect(wrapper.find('.ui-loading-overlay__loading-message')).toHaveLength(0);

      wrapper.setProps({ message: 'We are loading something...' });

      expect(wrapper.find('.ui-loading-overlay__loading-message')).toHaveLength(1);

      expect(wrapper.find('.ui-loading-overlay__loading-message')
        .hasClass('ui-loading-overlay__loading-message_right')).toEqual(true);

      expect(wrapper.find('.ui-loading-overlay__loading-container')
        .hasClass('ui-loading-overlay__loading-container_message-right')).toEqual(true);

      wrapper.setProps({ messageDirection: 'top' });

      expect(wrapper.find('.ui-loading-overlay__loading-message')
        .hasClass('ui-loading-overlay__loading-message_top')).toEqual(true);

      expect(wrapper.find('.ui-loading-overlay__loading-container')
        .hasClass('ui-loading-overlay__loading-container_message-top')).toEqual(true);
    });
  });
});
