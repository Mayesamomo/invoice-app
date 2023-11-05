/* eslint-disable react/prop-types */
import { createContext, useReducer, } from "react";

export const AppContext = createContext({});

const AppReducer = (state, action) => {
    switch (action.type) {
        case 'GET_INVOICES':
            return {
                ...state,
                invoices: action.payload,
                isFetching: false,
                error: false,
            };
        case 'GET_INVOICE':
            return {
                ...state,
                invoice: action.payload,
                isFetching: false,
                error: false,
            };

        case 'CREATE_INVOICE':
            return {
                ...state,
                invoices: [...state.invoices, action.payload],
                isFetching: false,
                error: false,
            };

        case 'UPDATE_INVOICE':
            return {
                ...state,
                invoices: state.invoices.map((invoice) => invoice._id === action.payload._id && action.payload),
                isFetching: false,
                error: false,
            };

        case 'DELETE_INVOICE':
            return {
                ...state,
                invoices: state.invoices.filter((invoice) => invoice._id !== action.payload),
                isFetching: false,
                error: false,
            };

        case 'RECENT_INVOICES':
            return {
                ...state,
                recentInvoices: action.payload,
                isFetching: false,
                error: false,
            };
        //@desc Client's actions
        case 'GET_CLIENTS':
            return {
                ...state,
                clients: action.payload,
                isFetching: false,
                error: false,
            };
        case 'GET_CLIENT':
            return {
                ...state,
                client: action.payload,
                isFetching: false,
                error: false,
            };
        case 'CREATE_CLIENT':
            return {
                ...state,
                clients: [...state.clients, action.payload],
                isFetching: false,
                error: false,
            };

        case 'UPDATE_CLIENT':
            return {
                ...state,
                clients: state.clients.map((client) => client._id === action.payload._id && action.payload),
                isFetching: false,
                error: false,
            };
        case 'DELETE_CLIENT':
            return {
                ...state,
                clients: state.clients.filter((client) => client._id !== action.payload),
                isFetching: false,
                error: false,
            };
        case 'GET_TOTAL_CLIENTS':
            return {
                ...state,
                totalClients: action.payload,
                isFetching: false,
                error: false,
            };
        default:
            return state;

    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, {
        invoices: [],
        clients: [],
        totalClients: 0,
        recentInvoices: [],
        isFetching: false,
        error: false,

    });

    console.log('AppContext state: ', state);
    return (
        <AppContext.Provider
            value={{ ...state, dispatch }}
        >
            {children}
        </AppContext.Provider>
    );
};