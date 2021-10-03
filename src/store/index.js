import { createStore } from 'vuex';
import storage from './storage/index';

export default createStore({
  state() {
    return {
      selectedDate: Date.now(),
      cardNum: null,
      schedules: null
    }
  },
  mutations: {
    setSelectedDate(state, date) {
      state.selectedDate = date;
    },
    setCardNum(state, num) {
      state.cardNum = num;
    },
    setSchedules(state, _schedules) {
      state.schedules = _schedules;
    }
  },
  actions: {
    goPrevDay({ commit, getters }) {
      const date = getters.getDateByNumFromSelectedDate(-1);
      commit('setSelectedDate', date);
    },
    goNextDay({ commit, getters }) {
      const date = getters.getDateByNumFromSelectedDate(1);
      commit('setSelectedDate', date);
    },
    refreshSchedules({ commit }, dateKeyStrArr) {
      const newSchedules = {};
      dateKeyStrArr.forEach(dateKey => {
        const schedule = storage.getData(dateKey);
        schedule?.todoList?.sort((a, b) => a.order - b.order);
        schedule?.doneList?.sort((a, b) => b.completedDate - a.completedDate);
        newSchedules[dateKey] = schedule;
      });
      commit('setSchedules', newSchedules);
    },
    addTodoSchedule({ state, dispatch, getters }, { dateKey, todoContent }) {
      let schedule = {};
      
      const thisDateSchedule = state.schedules[dateKey];
      if (!thisDateSchedule) {
        schedule.maxId = 0;
      } else {
        schedule = {...thisDateSchedule};
      }
      
      if (!schedule.todoList) {
        schedule.todoList = []; 
      }

      schedule.maxId++;
      const todoListLength = schedule.todoList.length;
      const todoObj = {
        id: schedule.maxId,
        order: todoListLength > 0 ? (schedule.todoList[todoListLength - 1].order + 1) : 1,
        content: todoContent,
        completedDate: null
      };

      schedule.todoList.push(todoObj);

      storage.setData(dateKey, schedule);

      dispatch('refreshSchedules', getters.getDatesShown());
    },
    deleteTodo({ state, dispatch, getters }, { dateKey, id }) {
      let schedule = {...state.schedules[dateKey]};
      const idx = schedule.todoList.findIndex(todo => todo.id === id);
      schedule.todoList.splice(idx, 1);

      storage.setData(dateKey, schedule);

      dispatch('refreshSchedules', getters.getDatesShown());
    },
    updateTodo({ state, dispatch, getters }, { dateKey, id, content }) {
      let schedule = {...state.schedules[dateKey]};
      const idx = schedule.todoList.findIndex(todo => todo.id === id);
      schedule.todoList[idx].content = content;

      storage.setData(dateKey, schedule);

      dispatch('refreshSchedules', getters.getDatesShown());
    },
    completeTodo({ state, dispatch, getters }, { dateKey, id }) {
      let schedule = {...state.schedules[dateKey]};
      const idx = schedule.todoList.findIndex(todo => todo.id === id);
      const completedTodo = schedule.todoList.splice(idx, 1)[0];
      completedTodo.completedDate = Date.now();

      if (!schedule.doneList) {
        schedule.doneList = [];
      }
      schedule.doneList.unshift(completedTodo);

      storage.setData(dateKey, schedule);

      dispatch('refreshSchedules', getters.getDatesShown());
    },
    changeOrder({ state, dispatch, getters }, { dateKey, fromId, toOrder }) {
      let schedule = {...state.schedules[dateKey]};
      const fromIdx = schedule.todoList.findIndex(todo => todo.id === fromId);
      const fromObj = schedule.todoList.splice(fromIdx, 1)[0];
      fromObj.order = toOrder;

      const toIdx = schedule.todoList.findIndex(todo => todo.order === toOrder);
      if (toIdx < 0) {
        schedule.todoList.push(fromObj);
      } else {
        schedule.todoList.forEach((todo, idx) => {
          if (idx === toIdx || idx > toIdx) {
            todo.order++;
          }
        });
        schedule.todoList.splice(toIdx, 0, fromObj);
      }

      storage.setData(dateKey, schedule);

      dispatch('refreshSchedules', getters.getDatesShown());
    }
  },
  getters: {
    getDateByNumFromSelectedDate: (state) => (num) => {
      return state.selectedDate.valueOf() + (1000 * 60 * 60 * 24 * num);
    },
    getDatesShown: (state) => () => {
      return Object.keys(state.schedules);
    }
    // getDateKeyStringFromNum: (_, getters) => (num) => {
    //   const dateMillisec = getters.getDateByNumFromSelectedDate(num);
    //   const date = new Date(dateMillisec);
    //   return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    // },
    // getSchedules(state, getters) {
    //   let schedules = {};
    //   const quotient = Math.floor(state.cardNum / 2);
    //   for(let i = (0 - quotient); i < (state.cardNum - quotient); i++) {
    //     const dateKeyStr = getters.getDateKeyStringFromNum(i);
        
    //     const thisDateSchedule = this.getDateData(thisDateKey);
    //     schedules[thisDateKey] = thisDateSchedule;
    //   }
    //   return state.schedules;
    // }
  },
  modules: {
  }
})
