const fetchButtons = useCallback(async () => {
    const id = await AsyncStorage.getItem('userID')
    const resp = await fetch(`${serverIP}/button/user/${id}`, { method: "GET" });
    console.log('fetchedButtons: ' + resp)
    setBotones(resp)
  }, [])

  useEffect(() => {
    fetchButtons();
  }, [fetchButtons]);