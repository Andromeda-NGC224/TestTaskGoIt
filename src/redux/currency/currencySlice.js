import { createSlice } from '@reduxjs/toolkit';
import { fetchBaseCurrency, fetchExchangeCurrency, fetchLatestSymbols } from '../../redux/currency/operations';

const initialState = {
  baseCurrency: '',
  exchangeInfo: null,
  loading: false,
  error: null,
  rates: [],
};
const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency: (state, { payload }) => {
      state.baseCurrency = payload;
    },
  },
  extraReducers: builder =>
    builder.addCase(fetchBaseCurrency.fulfilled, (state, { payload }) => {
      state.baseCurrency = payload;
    })
      .addCase(fetchExchangeCurrency.pending, (state) =>
      {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExchangeCurrency.fulfilled, (state, { payload }) => {
        state.exchangeInfo = payload;
        state.loading = false;
      })
      .addCase(fetchExchangeCurrency.rejected, (state, { payload }) => {
        state.error = payload;
        state.exchangeInfo = null;
        state.loading = false;
      })
      .addCase(fetchLatestSymbols.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestSymbols.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.rates = payload;
      })
      .addCase(fetchLatestSymbols.rejected, (state, { payload }) => {
        state.error = payload;
        state.rates = [];
        state.loading = false;
      })
});

export const { setBaseCurrency } = currencySlice.actions;
export const currencyReduser = currencySlice.reducer;
