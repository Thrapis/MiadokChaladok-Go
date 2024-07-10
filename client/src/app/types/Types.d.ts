declare type RootState = ReturnType<typeof import('app/store').store.getState>
declare type AppDispatch = typeof import('app/store').store.dispatch