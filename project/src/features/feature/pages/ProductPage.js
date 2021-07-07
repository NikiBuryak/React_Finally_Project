import React from "react";
import Box from "@material-ui/core/Box";
import {useParams} from "react-router";
import {Button, Container} from "@material-ui/core";
import {Link} from "react-router-dom";

export function ProductPage(){
    const params = useParams();

    return(
        <Container>
            <Box>
                Hello from ProductPage with id {params.id}
            </Box>
            <Button variant="outlined" to='/catalog/' exact component={Link}>Posts</Button>
        </Container>

    )
}