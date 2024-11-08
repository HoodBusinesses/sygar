import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type LangPayloadType = {
  name: string;
  id: string;
  isRtl: boolean;
};

export interface LangSliceType {
  main: LangPayloadType;
  others: Array<LangPayloadType>;
}

export const langs = [
  {
    name: 'English',
    id: 'en',
    isRtl: false,
  },
  {
    name: 'Français',
    id: 'fr',
    isRtl: false,
  },
  {
    name: 'العربية',
    id: 'ar',
    isRtl: true,
  },
];

const main = langs[1];

const initialState: LangSliceType = {
  main,
  others: langs.filter((lang) => lang.id !== main.id),
};

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    changeLang: (
      state: LangSliceType,
      { payload }: PayloadAction<LangPayloadType>
    ) => {
      return {
        others: state.others
          .filter((lang) => lang.id !== payload.id)
          .concat([state.main]),
        main: payload,
      };
    },
    reset: () => initialState,
  },
});

export const { changeLang, reset: resetLang } = langSlice.actions;

export default langSlice.reducer;
