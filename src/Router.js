import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import NavigationActions from "react-navigation/lib/NavigationActions";
import * as Views from './components/views';
import { colors } from './common/styles';

export const INITIAL_ROUTE = 'NoWallet';

const navigator = StackNavigator({
    NoWallet: { screen: Views.NoWallet },
    NewWallet: { screen: Views.NewWallet },
    LoadMnemonics: { screen: Views.LoadMnemonics },
    LoadPrivateKey: { screen: Views.LoadPrivateKey },
    LoadWallet: { screen: Views.LoadWallet },
    CreateMnemonics: { screen: Views.CreateMnemonics },
    ConfirmMnemonics: { screen: Views.ConfirmMnemonics },
    WalletsOverview: { screen: Views.WalletsOverview }
}, {
    initialRouteName: INITIAL_ROUTE,
    navigationOptions: {
        headerStyle: {
            backgroundColor: colors.primary,
        },
        headerTintColor: colors.secondary
    }
});

const parentGetStateForAction = navigator.router.getStateForAction;

navigator.router.getStateForAction = (action, inputState) => {
    const state = parentGetStateForAction(action, inputState);
    
    // fix it up if applicable
    if (state && action.type === NavigationActions.NAVIGATE) {
        if (action.params && action.params.replaceRoute) {
            delete action.params.replaceRoute;
            while (state.routes.length > 1 && state.index > 0) {
                const oldIndex = state.index - 1;
                // remove one that we are replacing
                state.routes.splice(oldIndex, 1);
                // index now one less
                state.index = oldIndex;
            }
        }
    }

    return state;
};

export default navigator;