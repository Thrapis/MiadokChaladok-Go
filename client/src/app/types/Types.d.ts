declare type RootState = ReturnType<typeof import('app/store/Store').store.getState>
declare type AppDispatch = typeof import('app/store/Store').store.dispatch