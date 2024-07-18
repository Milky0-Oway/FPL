import React, {createContext, useReducer, useContext, PropsWithChildren} from 'react';

type Operation = {
    date: string;
    from: string;
    amount: number;
    to: string;
    result: number;
}

type Action = {
    type: 'ADD';
    payload: Operation;
}

type ContextType = {
    history: Operation[];
    dispatch: React.Dispatch<Action>;
}

const HistoryContext = createContext<ContextType | undefined>(undefined);

const historyReducer = (state: Operation[], action: Action): Operation[] => {
    switch (action.type) {
        case 'ADD':
            return [...state, action.payload];
        default:
            return state;
    }
};

export const ContextProvider = ({ children }: PropsWithChildren) => {
    const [history, dispatch] = useReducer(historyReducer, []);

    return (
        <HistoryContext.Provider value={{ history, dispatch }}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (!context) {
        throw new Error('useHistory must be used within a ContextProvider');
    }
    return context;
};
