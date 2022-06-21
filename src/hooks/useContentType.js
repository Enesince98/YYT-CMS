import { useContext } from "react";
import ContentTypeContext from "../context/ContentTypeProvider";

const useAuth = () => {
    const { data } = useContext(ContentTypeContext);
    return useContext(ContentTypeContext);
}

export default useAuth;