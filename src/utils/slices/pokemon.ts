import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from "../store";
import * as api from "../apis";
import { Pokemon, PokemonState } from "../types";

const initialState: PokemonState = {
  status: "idle",
  currentPokemon: null,
  capturedPokemon: [],
  currentCapturedPokemon: null,
};

export const getAllPokemon = createAsyncThunk(
  "pokemon/getAllPokemon",
  async (pagination: { limit: number; offset: number }) => {
    const response: any = await api.fetchAllPokemon(
      pagination.limit,
      pagination.offset
    );
    return response.results;
  }
);

export const getSinglePokemon = createAsyncThunk(
  "pokemon/getSinglePokemon",
  async (name: string) => {
    const response: any = await api.fetchSinglePokemon(name);
    return response;
  }
);

export const capturePokemon = createAsyncThunk(
  "pokemon/capturePokemon",
  async (pokemon: Pokemon) => {
    const response = await api.capturePokemon(pokemon);
    return response;
  }
);

export const getAllCapturedPokemon = createAsyncThunk(
  "pokemon/getAllCapturedPokemon",
  async () => {
    const response = await api.getAllCapturedPokemon();
    return response;
  }
);

export const getSingleCapturedPokemon = createAsyncThunk(
  "pokemon/getSingleCapturedPokemon",
  async (id: string) => {
    const response = await api.getSingleCapturedPokemon(id);
    return response;
  }
);

export const getRandomPokemon = createAsyncThunk(
  'pokemon/fetchRandomPokemon',
  async () => {
    const response: any = await fetchRandomPokemon();
    return response;
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    //   capturePokemon: (state, action: PayloadAction<PokemonCaptured>) => {
    //     const localPokemon = JSON.parse(localStorage.getItem("pokemon") || "[]");
    //     if (
    //       !localPokemon.find((el: Pokemon) => el.name === action.payload.name)
    //     ) {
    //       const newLocalPokemon = [...localPokemon, action.payload];
    //       localStorage.setItem("pokemon", JSON.stringify(newLocalPokemon));
    //       state.myPokemon = newLocalPokemon;
    //     }
    //   },
    //   releasePokemon: (state, action: PayloadAction<PokemonCaptured>) => {
    //     const localPokemon = JSON.parse(localStorage.getItem("pokemon") || "[]");
    //     const newLocalPokemon = localPokemon.filter(
    //       (el: Pokemon) => el.name !== action.payload.name
    //     );
    //     localStorage.setItem("pokemon", JSON.stringify(newLocalPokemon));
    //     state.myPokemon = newLocalPokemon;
    //   },
    //   loadMyPokemon: (state, action: PayloadAction) => {
    //     state.myPokemon = JSON.parse(localStorage.getItem("pokemon") || "[]");
    //   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSinglePokemon.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentPokemon = action.payload;
      })
      .addCase(capturePokemon.fulfilled, (state, action) => {
        state.status = "idle";
        state.capturedPokemon = [];
      })
      .addCase(getAllCapturedPokemon.fulfilled, (state, action) => {
        state.status = "idle";
        state.capturedPokemon = [];
      })
      .addCase(getSingleCapturedPokemon.fulfilled, (state, action) => {
        state.status = "idle";
        state.capturedPokemon = [];
      })
      .addMatcher(
        isAnyOf(
          getSinglePokemon.pending,
          getAllCapturedPokemon.pending,
          getSingleCapturedPokemon.pending,
          capturePokemon.pending
        ),
        (state) => {
          state.status = "loading";
        }
      );
  },
});

export const selectCapturedPokemon = (state: RootState) =>
  state.pokemon.capturedPokemon;
export const selectCurrentCapturedPokemon = (state: RootState) =>
  state.pokemon.currentCapturedPokemon;
export const selectPokemonStatus = (state: RootState) => state.pokemon.status;

// export const {} = pokemonSlice.actions;
export default pokemonSlice.reducer;
