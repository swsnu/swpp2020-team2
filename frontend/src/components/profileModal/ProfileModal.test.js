import React from 'react';
import { mount, shallow } from 'enzyme';

import ProfileModal from './ProfileModal';

import * as userActions from '../../store/actions/user';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import getMockStore from '../../test-utils/mocks';
import { Provider } from 'react-redux';

describe('ProfileModal', () => {
    let profileModal

    const history = createBrowserHistory();

    beforeEach(() => {
        profileModal = (
            <Provider store={getMockStore({})}>
                <ConnectedRouter history={history}>
                    <ProfileModal history={history}/>
                </ConnectedRouter>
            </Provider>
        );
    });

    afterEach(() => { jest.clearAllMocks(); });

    it('should render without error', () => {
        const component = mount(profileModal);
        expect(component.find('.ProfileModal').length).toBe(1);
    });

    it('buttons should work properly', () => {
        const component = mount(profileModal);

        const spyHistorypush = jest.spyOn(history, 'push').mockImplementation(path => { });
        const spySignOut = jest.spyOn(userActions, 'signOut').mockImplementation((event) => { return dispatch => { }; });

        const wrappers = component.find('.btn');
        wrappers.at(0).simulate('click');
        expect(spyHistorypush).toHaveBeenCalledTimes(1);
        wrappers.at(1).simulate('click');
        expect(spySignOut).toHaveBeenCalledTimes(1);

    });
});
