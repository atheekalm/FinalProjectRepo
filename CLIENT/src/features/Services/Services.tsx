import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../test_redux/configureStore";
import ServiceCardList from "./ServiceCardList";
import { fetchServicesAsync, serviceSelectors } from "./serviceSlice";

export default function Services() {
    const service = useAppSelector(serviceSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { servicesLoaded } = useAppSelector(state => state.services)

    useEffect(() => {
        // client_agent.Appservice.services().then(services => setService(services))
        if (!servicesLoaded) dispatch(fetchServicesAsync())
    }, [servicesLoaded, dispatch])

    return (
        <>
            <ServiceCardList serviceList={service} />
        </>
    )
}