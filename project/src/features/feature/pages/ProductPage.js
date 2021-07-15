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
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
    productText: {
        marginBottom: theme.spacing(2)
    }
}))
const theme = {
    spacing: 10,
}
const StyledBadge = withStyles(theme => ({
    badge: {
        top: '50%',
        right: -3,
        // The border color match the background color.
        border: `2px solid ${
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
        }`,
    },
}))(Badge);


export function ProductPage() {
    const dispatch = useDispatch();
    const items = useSelector(basketDuck.selectItems)
    const {id} = useParams();
    const classes = useStyles();
    const [deleteNumb,setDeleteNumb] = useState(1)

    const currentProduct = items.find(el => el.id === id);
    const currentProductVal = currentProduct && currentProduct.value;


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
    const handleBuyBtn = (id, val) => {
        let valNumb = +val;
        dispatch(basketDuck.addItem(id, valNumb));
    }

    const handleDeleteInput = ({target:{value}}) =>{
        value = value.replace(/[^0-9]/g,"");
        setDeleteNumb(value);
    }
    const deleteFromBasket = (id, price) =>{
        dispatch(basketDuck.removeItem(id, {deleteNumb,price}));

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

                            <Button variant="outlined" disabled={!data.isInStock}
                                    onClick={() => handleBuyBtn(data && data.id, data.price)}>
                                {data.isInStock ? 'Buy' : 'Out of stock'}
                            </Button>
                            <Button variant="outlined" to='/catalog/' component={Link}>Back</Button>

                            {
                                currentProductVal && <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={currentProductVal} color="primary">
                                        <ShoppingCartIcon/>
                                    </StyledBadge>
                                </IconButton>
                            }

                            {currentProductVal && <Box>
                                <input value={deleteNumb} onChange={handleDeleteInput}></input>

                                <Button onClick={() =>deleteFromBasket(data.id, data.price)}>Delete</Button>
                            </Box>

                            }


                            <ul className={classes.productText}>Categories:
                                {data.categories.map((category) =><li key={category}>{category}</li>)}
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