import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import store from '../redux/store'
import { shallow, mount } from 'enzyme'
import MealPlanCurrentWk from '../Components/MealPlanComponents/MealPlanCurrentWk/MealPlanCurrentWk'
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('MealPlanner Component', () => {
    it('Calendar instance should render.', () => {
        const component = mount(<Provider store={store}><HashRouter><MealPlanCurrentWk /></HashRouter></Provider>)
        const wrapper = component.find('.calendar-container-mealplan-currentweek')
        console.log(wrapper)
        expect(wrapper.length).toBe(1)
    })
})