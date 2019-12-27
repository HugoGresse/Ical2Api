import { useEffect } from "react";
import { useStateValue } from "./state/state";
import { firestore } from "./utils/firestore";

const DataLoading = ({ children }) => {
  // noinspection JSUnusedLocalSymbols
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    firestore.collection("icals").onSnapshot(querySnapshot => {
      dispatch({
        type: "meetupsLoaded",
        payload: querySnapshot.docs.map(ref => ({ id: ref.id, ...ref.data() }))
      });
    });
    firestore.collection("events").onSnapshot(querySnapshot => {
      dispatch({
        type: "eventsLoaded",
        payload: querySnapshot.docs.map(ref => ({ id: ref.id, ...ref.data() }))
      });
    });
  }, [dispatch]);

  return children;
};

export default DataLoading;
