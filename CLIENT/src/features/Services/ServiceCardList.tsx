import { Grid } from "@mui/material";
import { Service } from "../../app/models/Service";
import ServiceCard from "./ServiceCard";

interface Props {
    serviceList: Service[] ;
}
export default function ServiceCardList({ serviceList }: Props) {
    return (
        <>
            <Grid container >
                {serviceList.map(service => (
                    <Grid item xs={3} key={service.id}>
                        <ServiceCard service={service} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}