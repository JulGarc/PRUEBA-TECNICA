import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface GuideState {
  data: any; 
  loading: boolean;
  error: string | null;
}

const initialState: GuideState = {
  data: null,
  loading: false,
  error: null,
};


const guideSlice = createSlice({
  name: 'guide',
  initialState,
  reducers: {
    fetchGuideStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchGuideSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchGuideFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});


export const { fetchGuideStart, fetchGuideSuccess, fetchGuideFailure } = guideSlice.actions;
export default guideSlice.reducer;
