import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import EventModify from './EventModify';

import getMockStore from '../../../test-utils/mocks';
/*
import * as actionCreators from '../../../store/actions/articles';
import * as actionCreators_user from '../../../store/actions/users';
*/
import {createBrowserHistory} from 'history'; 

const stubInitialState = [
    
];

const mockStore = getMockStore(stubInitialState);

describe('<ArticleModify />', () => {
    let eventModify;

    const history = createBrowserHistory();

    beforeEach(() => {
        eventModify = (
            <Provider store={mockStore}>
                <BrowserRouter>
                    <Switch>
                        <Route path='/' exact component={EventModify} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
        history.push('/');
    })

    it('should render eventModify without errors', () => {
        const component = mount(eventModify);
        const wrapper = component.find('.EventModify');
        expect(wrapper.length).toBe(1);
    });

    /*
    it(`should set state properly on title input`, () => {
        const title = 'TEST_Modify_TITLE'
        const component = mount(articleModify);
        const wrapper = component.find('#article-title-input');
        wrapper.simulate('change', { target: { value: title } });
        const articleModifyInstance = component.find(ArticleModify.WrappedComponent).instance();
        expect(articleModifyInstance.state.title).toEqual(title);
        expect(articleModifyInstance.state.content).toEqual(stubInitialState[0].selectedArticle.content);
    });

    it(`should set state properly on content input`, () => {
        const content = 'TEST_Modify_CONTENT'
        const component = mount(articleModify);
        const wrapper = component.find('#article-content-input');
        wrapper.simulate('change', { target: { value: content } });
        const articleModifyInstance = component.find(ArticleModify.WrappedComponent).instance();
        expect(articleModifyInstance.state.title).toEqual(stubInitialState[0].selectedArticle.title);
        expect(articleModifyInstance.state.content).toEqual(content);
    });

    it(`should call 'setArticle' and go to DetailPage after Modifying`, () => {
        const spyPostArticle = jest.spyOn(actionCreators, 'setArticle').mockImplementation((article) => { return dispatch => { }; });
        const history = createBrowserHistory();
        const component = mount(articleModify);
        const wrapper = component.find('#confirm-Modify-article-button');

        component.find('#article-title-input').simulate('change', { target: { value: 'TEST_Modify_TITLE' } });
        component.find('#article-content-input').simulate('change', { target: { value: 'TEST_Modify_CONTENT' } });
        
        wrapper.simulate('click');
        expect(spyPostArticle).toHaveBeenCalledTimes(1);
        expect(component.find('h1').text()).toBe('ArticleDetail');
        history.push('/');
    });

    it('should confirm-No during backing to articlesDetail', () => {
        const spyModify_No=jest.spyOn(window,'confirm').mockImplementation(()=>false);

        const component = mount(articleModify);
        const wrapper = component.find('#back-Modify-article-button');

        component.find('#article-title-input').simulate('change', { target: { value: 'TEST_Modify_TITLE' } });
        component.find('#article-content-input').simulate('change', { target: { value: 'TEST_Modify_CONTENT' } });
        wrapper.simulate('click');

        expect(component.find('h1').text()).toBe('ArticleModify');
    });

    it('should confirm-Yes during backing to articlesDetail', () => {
        const history = createBrowserHistory();
        const spyModify_Yes=jest.spyOn(window,'confirm').mockImplementation(()=>true);

        const component = mount(articleModify);
        const wrapper = component.find('#back-Modify-article-button');

        component.find('#article-title-input').simulate('change', { target: { value: 'TEST_Modify_TITLE' } });
        component.find('#article-content-input').simulate('change', { target: { value: 'TEST_Modify_CONTENT' } });
        wrapper.simulate('click');

        expect(component.find('h1').text()).toBe('ArticleDetail');
        history.push('/');
    });

    it('should back to articlesDetail', () => {
        const history = createBrowserHistory();

        const component = mount(articleModify);
        const wrapper = component.find('#back-Modify-article-button');

        component.find('#article-title-input').simulate('change', { target: { value: 'TEST_TITLE_1' } });
        component.find('#article-content-input').simulate('change', { target: { value: 'TEST_CONTENT_1' } });
        wrapper.simulate('click');

        expect(component.find('h1').text()).toBe('ArticleDetail');
        history.push('/');
    });
    */
});