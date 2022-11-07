import {createReducer} from '@reduxjs/toolkit';
import {isDark} from 'native-base/lib/typescript/theme/tools';
import {userAction} from '../action';
import {createAction} from '@reduxjs/toolkit';

export interface LocationState {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  marker: {
    latitude: number;
    longitude: number;
  };
  addressName: string;
  addressDetail: string;
}
export const initialState = {} as LocationState;
export const setLocationAction = createAction<LocationState>(
  'location/setLocation',
);
const locationReducer = createReducer(initialState, builder => {
  builder.addCase(setLocationAction, (state, action) => {
    const payload = action.payload;
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
      marker,
      addressName,
      addressDetail,
    } = payload;
    state.latitude = latitude;
    state.longitude = longitude;
    state.latitudeDelta = latitudeDelta;
    state.longitudeDelta = longitudeDelta;
    state.marker = marker;
    state.addressName = addressName;
    state.addressDetail = addressDetail;
  });
});
export {locationReducer};
