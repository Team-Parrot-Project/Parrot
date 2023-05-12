export const SET_TIMEFRAME = 'SET_TIMEFRAME';
export const SET_PROJECT_ID = 'SET_PROJECT_ID';

export const setTimeframe = (timeframe) => ({
  type: SET_TIMEFRAME,
  payload: timeframe
});

export const setProjectId = (projectId) => ({
  type: SET_PROJECT_ID,
  payload: projectId
});

const initialState = {
  selectedTimeframe: 'week',
  selectedProjectId: null
};

const timeframeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMEFRAME:
      return {
        ...state,
        selectedTimeframe: action.payload
      };
    case SET_PROJECT_ID:
      return {
        ...state,
        selectedProjectId: action.payload
      };
    default:
      return state;
  }
};

export default timeframeReducer;
