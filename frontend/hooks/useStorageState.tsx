import { useEffect, useCallback, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
    initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
    return useReducer(
        (
            state: [boolean, T | null],
            action: T | null = null
        ): [boolean, T | null] => [false, action],
        initialValue
    ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
    if (Platform.OS === "web") {
        try {
            if (value === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, value);
            }
        } catch (e) {
            console.error("Local storage is unavailable:", e);
        }
    } else {
        if (value == null) {
            await SecureStore.deleteItemAsync(key);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    }
}
export interface SessionData {
    id_usuario: string|null;
    imagen_url: string|null;
    nombre: string|null;
    email: string|null;
    telefono: string|null;
    duenio: boolean|null;
}

export function useStorageState(key: string): UseStateHook<SessionData> {
    // Public
    const [state, setState] = useAsyncState<SessionData>();

    // Get
    useEffect(() => {
        if (Platform.OS === "web") {
            try {
                if (typeof localStorage !== "undefined") {
                    if (localStorage.getItem(key)) {
                        setState(JSON.parse(localStorage.getItem(key)!));
                    }
                }
            } catch (e) {
                console.error("Local storage is unavailable:", e);
            }
        } else {
            SecureStore.getItemAsync(key).then((value) => {
                if (value!== null) {
                    setState(JSON.parse(value));
                }
            });
        }
    }, [key]);

    // Set
    const setValue = useCallback(
        (value: SessionData | null) => {
            setState(value);
            setStorageItemAsync(key, JSON.stringify(value));
        },
        [key]
    );

    return [state, setValue];
}
