import { createSlice } from '@reduxjs/toolkit'
import { SearchInterface } from '../../interfaces/search.interface';


const searchData: SearchInterface = {
    search: '',
};

export const searchSlice = createSlice({
    name: 'search',
    initialState: searchData,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
    },
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
