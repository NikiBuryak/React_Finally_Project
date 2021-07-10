import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import {useParams} from "react-router";
import {Button, Container, makeStyles, Typography} from "@material-ui/core";
import {Link, NavLink} from "react-router-dom";
import {useQuery} from "react-query";
import {get, getCatalog} from "../api/ProductsAPI";
import Badge from '@material-ui/core/Badge';
import * as basketDuck from "../ducks/basket.duck";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    productText: {
        marginBottom: theme.spacing(2)
    }
}))
const theme = {
    spacing: 10,
}


export function ProductPage() {
    const dispatch = useDispatch();
    const items = useSelector(basketDuck.selectItems)
    const {id} = useParams();
    const classes = useStyles();



    const {data, error, isLoading} = useQuery('product', async () => {
        const {data} = await get(id)
        return data;
    });

    const list = useQuery('productsList', async () => {
        const {data} = await getCatalog()
        return data;
    });

    const findList = (arr) => {
        let newArr = arr.filter((el) => el.categories.includes(data.categories[0]) || el.categories.includes(data.categories[1]))
        return newArr;
    }
    const handleBuyBtn = (id) =>{
        console.log(id)
        dispatch(basketDuck.addItem(id));
        console.log(items)

    }


    return (
        <Container>
            <Box>
                {isLoading ? <div>Loading...</div>
                    : error ? <div>Error: {error}</div>
                        : <Container>
                            <Typography className={classes.productText} variant="h3">{data.title}</Typography>
                            <img src={data.photo}/>
                            <Box display="flex">
                                {data.isInStock &&
                                <Badge color="error" variant="dot">
                                    <Typography variant="h6" mr={2} color="inherit">IN STOCK!!!</Typography>
                                </Badge>}
                                {data.isNew &&
                                <Badge color="error" variant="dot">
                                    <Typography variant="h6" color="inherit">NEW!!!</Typography>
                                </Badge>}
                                {data.isSale &&
                                <Badge color="error" variant="dot">
                                    <Typography variant="h6" color="inherit">ON SALE!!!</Typography>
                                </Badge>}
                            </Box>
                            <p>Price : {data.price}</p>
                            <Typography className={classes.productText} variant="h6" color='inherit'>Rating
                                : {data.rating}</Typography>

                            <Button variant="outlined" disabled={!data.isInStock} onClick={()=>handleBuyBtn(data && data.id)}>
                                {data.isInStock ? 'Buy' : 'Out of stock'}
                            </Button>
                            <Button variant="outlined" to='/catalog/' exact component={Link}>Back</Button>
                            <ul className={classes.productText}>Categories:
                                {data.categories.map((category) => <li key={category}>{category}</li>)}
                            </ul>
                            <Typography>{data.description}</Typography>
                            <Box mt={5}>
                                <Typography variant="h5">Similar products</Typography>
                                {list.isLoading ? <div>Loading some products...</div>
                                    : list.error ? <div>Error loading : {list.error}</div>
                                        : findList(list.data).slice(2, 6).map((el) => (
                                            <div key={el.id}>
                                                {el.title}
                                                <p>{el.price}</p>
                                            </div>
                                        ))}
                            </Box>
                        </Container>}

            </Box>
        </Container>


    )
}