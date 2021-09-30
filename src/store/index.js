import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      selectedDate: new Date(),
      cardNum: null,
      schedules: {}
    }
  },
  mutations: {
    setSelectedDate(state, date) {
      state.selectedDate = date;
    },
    setCardNum(state, num) {
      state.cardNum = num;
    },
    setSchedules(state, schedules) {
      state.schedules = schedules;
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
    saveDateData({ commit, state }, dateStr) {
      const data = localStorage.getItem(dateStr);
      let parsedData = null;
      if (data) {
        parsedData = JSON.parse(data);
      }
      commit('setSchedules', {
        ...state.schedules,
        date: parsedData
      });
    }
  },
  getters: {
    getDateByNumFromSelectedDate: (state) => (num) => {
      return state.selectedDate.valueOf() + (1000 * 60 * 60 * 24 * num);
    },
    // getSchedules(state, getters) {
    //   const quotient = Math.floor(state.cardNum / 2);
    //   for(let i = (0 - quotient); i < (state.cardNum - quotient); i++) {
    //     const thisDate = getters.getDateByNumFromSelectedDate(i);
    //     const thisDateKey = getters.getKeyStringFromDate(thisDate);
        
    //   }

    //   return schedules;
    // }
  },
  modules: {
  }
})
