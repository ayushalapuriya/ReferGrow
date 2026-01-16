import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Service = {
  _id: string;
  name: string;
  price: number;
  businessVolume: number;
  status?: string;
};

export type ServiceState = {
  services: Service[];
};

const initialState: ServiceState = {
  services: [],
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
    clearServices: (state) => {
      state.services = [];
    },
  },
});

export const { setServices, clearServices } = serviceSlice.actions;

export default serviceSlice.reducer;
