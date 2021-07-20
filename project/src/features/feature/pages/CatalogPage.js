import React, {useState} from 'react';
import {useQuery} from 'react-query'
import {getCatalog} from "../api/ProductsAPI";
import Box from "@material-ui/core/Box";
import {Button, Container, makeStyles, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
    postContainer: {
        margin: 0,
        marginBottom: theme.spacing(5),
        width: '30%',

    },
    root: {
        maxWidth: 345,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
    },
    slider:{
        width: 300,
    },
    media: {
        height: 140,
    },
    postsContainer: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row"
    }

}));

function valuetext(value) {
    return `${value}`;
}

const theme = {
    spacing: 10,
}

export function CatalogPage() {

    const [price, setPrice] = useState([0, 100]);
    const [rating, setRating] = useState([0, 100]);
    const classes = useStyles();
    const [list, setList] = useState(null);


    const [isNewVal, setIsNewVal] = useState(false)
    const [isSaleVal, setIsSaleVal] = useState(false)
    const [isStockVal, setIsStockVal] = useState(false)

    const {data, error, isLoading} = useQuery('catalog', async () => {
        const {data} = await getCatalog()
        setList(data)
        return data;
    });

    const handleChangeSliderPrice = (event, newValue) => {
        setPrice(newValue);
        const min = price[0]
        const max =price[1]
        const newList = list.filter((el) =>{
           return el.price >= min && el.price <= max
        })
        setList(newList);
    };

    const handleChangeSliderRating = (event, newValue) => {
        setRating(newValue);
        const min = rating[0]
        const max =rating[1]
        const newList = list.filter((el) =>{
            return el.price >= min && el.price <= max
        })
        setList(newList);
    };
    const handleChangeNew = () => {
        setIsNewVal(!isNewVal);
        const newList = list.filter((el) =>{
            return el.isNew === isNewVal
        })
        isNewVal ? setList(newList) : setList(data)

    };
    const handleChangeSale = () => {
        setIsSaleVal(!isSaleVal);
        const newList = list.filter((el) =>{
            return el.isSale === isSaleVal
        })
        isSaleVal ? setList(newList) : setList(data)


    };
    const handleChangeStock = () => {
        setIsStockVal(!isStockVal);
        console.log(list[0])
        const newList = list.filter((el) =>{
            return el.isInStock === isStockVal;
        })
        isStockVal ? setList(newList) : setList(data)


    };

    return (
        <div className="page">
            {isLoading ? <div>Lading...</div>
                : error ? <div>Error : {error}</div>
                    : <div>
                        <Box mb={5}>
                            <Typography>Filters</Typography>
                            <Box mb={3}>
                                <div className={classes.slider}>
                                    <Typography id="range-slider" gutterBottom>
                                        Price
                                    </Typography>
                                    <Slider
                                        value={price}
                                        onChange={handleChangeSliderPrice}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                        getAriaValueText={valuetext}
                                    />
                                </div>
                            </Box>
                            <Box><div className={classes.slider}>
                                <Typography id="range-slider" gutterBottom>
                                    Rating
                                </Typography>
                                <Slider
                                    value={rating}
                                    onChange={handleChangeSliderRating}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={valuetext}
                                />
                            </div></Box>
                            <Box>New
                                <Switch
                                    onChange={handleChangeNew}
                                    color="primary"
                                    name="Is New"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            </Box>
                            <Box>Sale
                                <Switch
                                    onChange={handleChangeSale}
                                    color="primary"
                                    name="Is New"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                /></Box>
                            <Box>In Stock
                                <Switch
                                    onChange={handleChangeStock}
                                    color="primary"
                                    name="Is New"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                /></Box>
                        </Box>
                        <Container className={classes.postsContainer}>
                            {list && list.map((post) => (
                                <Container className={classes.postContainer} key={post.id}>
                                    <Card className={classes.root}>
                                        <CardContent>
                                            <h3>{post.title}</h3>
                                            <p>{post.description}</p>
                                            <ul>Categories:
                                                {post.categories.map((category) => category && <li
                                                    key={category}>{category}</li>)}
                                            </ul>
                                            <Box>
                                                {post.isInStock &&
                                                <Typography variant="h6" color="error">IN STOCK!!!</Typography>}
                                                {post.isNew &&
                                                <Typography variant="h6" color="error">NEW!!!</Typography>}
                                                {post.isSale &&
                                                <Typography variant="h6" color="error">ON SALE!!!</Typography>}
                                            </Box>
                                            <p>Price : {post.price}</p>
                                        </CardContent>
                                        <CardMedia
                                            className={classes.media}
                                            image={post.photo}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" color='inherit'>Rating
                                                : {post.rating}</Typography>
                                        </CardContent>

                                        <CardActions>
                                            <Button size="small" color="primary" variant="outlined"
                                                    to={`/catalog/${post.id}`}
                                                    component={Link}>
                                                Detailed
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Container>
                            ))}
                        </Container>
                    </div>
            }
        </div>
    );
}

;
