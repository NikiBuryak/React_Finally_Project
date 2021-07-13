import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import {useQuery} from "react-query";
import {get, getCatalog} from "../api/ProductsAPI";
import {useSelector} from "react-redux";
import * as basketDuck from "../ducks/basket.duck";
import {selectItems} from "../ducks/basket.duck";
import {Button, Container, Typography} from "@material-ui/core";


export function StorePage() {
    const [basketlist, setBasketList] = useState([]);

    let items = useSelector(basketDuck.selectItems);
    items = items.filter((item) => !!item.id);

    const {data, error, isLoading} = useQuery('cataloglist', async () => {
        const {data} = await getCatalog()
        return data;
    });

    useEffect(() => {
        setBasketList(data && data.filter(({id}) => items.find(el => el.id === id)));

    }, []);

    console.log(items)
    console.log(basketlist)

    return (
        <Container>
            {basketlist.map((data) => (
                <Box key={data.id}>
                    <img src={data.photo}/>
                    <Typography className={data.productText} variant="h3">{data.title}</Typography>
                    <p>Price : {data.price}</p>
                    {/*<input value={} onChange={}>123</input>*/}
                    <p>Price : {data.price * items.find(el => el.id === data.id).value}</p>
                    {/*<Button onClick={handleDeleteClick}>Delete</Button>*/}
                </Box>
            ))}
            <p>Summary products: {}</p>
            <span>Summary price : {}</span>
            {/*<Button onClick={handleSubmitClick}>Submit</Button>*/}

        </Container>
    )
}