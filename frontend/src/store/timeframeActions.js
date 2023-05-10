export const SET_TIMEFRAME = 'SET_TIMEFRAME';

export const setTimeframe = (timeframe) => ({
  type: SET_TIMEFRAME,
  payload: timeframe
});


const initialState = {
  selectedTimeframe: 'month'
};

const timeframeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMEFRAME:
      return {
        ...state,
        selectedTimeframe: action.payload
      };
    default:
      return state;
  }
};

export default timeframeReducer;
