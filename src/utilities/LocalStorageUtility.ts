const LocalStorageUtility = () => {

    const saveState = (state: any) => {
        try
        {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('state', serializedState);
        }
        catch (error) { console.log("localStorages____error", error) ; }
    };

    const loadState = () => {
        try 
        {
            const serializedState = localStorage.getItem('state');
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        }
        catch (error)  {
            return undefined;
        }
   };

   const loadValue = (key: string) => {
        try 
        {
            const serializedState = localStorage.getItem(key);
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        }
        catch (error)  {
            return undefined;
        }
    };

    const saveValue = (key: string, state: any) => {
        try
        {
            const serializedState = JSON.stringify(state);
            localStorage.setItem(key, serializedState);
        }
        catch (error) { console.log("localStorages____error", error) ; }
    };

    return { saveState, loadState, loadValue, saveValue }
}

export default LocalStorageUtility();