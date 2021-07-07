import React from "react";
import Box from "@material-ui/core/Box";
import {useParams} from "react-router";
import {Button, Container} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import {get} from "../api/ProductsAPI";

export function ProductPage() {
    const {id} = useParams();
    console.log(id)

    const {data, error, isLoading} = useQuery('product', async () => {
        const {data} = await get(id)
        return data;
    });
    console.log(data)

    return (
        <Container>
            <Box>
                {isLoading ? <div>Loading...</div>
                    : error ? <div>Error: {error}</div>
                        : <div>{data.title}</div>
                }
            </Box>
            <Button variant="outlined" to='/catalog/' exact component={Link}>Posts</Button>
        </Container>

    )
}