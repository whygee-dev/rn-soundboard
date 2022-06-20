import { TypedUseSelectorHook, useDispatch as _useDispatch, useSelector as _useSelector } from "react-redux";
import { RootState } from "./rootReducer";

export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
