import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = "https://covidnigeria.herokuapp.com/api";

interface CovidCases {
  totalSamplesTested: string;
  totalConfirmedCases: number;
  totalActiveCases: number;
  discharged: number;
  death: number;
  states: {
    state: string;
    _id: string;
    confirmedCases: number;
    casesOnAdmission: number;
    discharged: number;
    death: number;
  }[];
}

interface State {
  isLoading: boolean;
  data: CovidCases | null;
  error: string | null | undefined;
}

interface JSONResponse {
  data: CovidCases;
}

const fetchCovidCases = createAsyncThunk("data/fetchCovidCases", async () => {
  const response = await fetch(API_URL);
  const data: JSONResponse = await response.json();
  return data.data;
});

const initialState: State = {
  isLoading: false,
  data: null,
  error: null,
};

const dataSlice = createSlice({
  name: "covidCases",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCovidCases.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCovidCases.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCovidCases.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export { fetchCovidCases };
export const covidCasesReducer = dataSlice.reducer;
