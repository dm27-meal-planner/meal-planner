import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import store from '../redux/store'
import { shallow, mount } from 'enzyme'
import MealPlanExe from '../Components/MealPlanComponents/MealPlanExe/MealPlanExe'
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

configure({ adapter: new Adapter() });


describe('MealPlannerNutrition Component', () => {
    it('double bar graph should when a meal is selected', () => {
        const component = shallow(<MealPlanExe store={store} />).childAt(0).dive()

        console.log(component.find('.calendar-container-mealplan-currentweek').childAt(0).debug())
    })
})