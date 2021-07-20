import React from 'react';
import {useQuery} from 'react-query'
import {getCatalog} from "../api/ProductsAPI";
import Box from "@material-ui/core/Box";
import {Button, Container, makeStyles, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

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
    media: {
        height: 140,
    },
    postsContainer: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row"
    }

}));
const theme = {
    spacing: 10,
}

export function CatalogPage() {

    const classes = useStyles();


    const {data, error, isLoading} = useQuery('catalog', async () => {
        const {data} = await getCatalog()
        return data;
    });


    return (
        <div className="page">
            {isLoading ? <div>Lading...</div>
                : error ? <div>Error : {error}</div>
                    : <div>
                        <Box mb={5}>
                            <Typography>Filters</Typography>
                            <Box>Price</Box>
                            <Box>Rating</Box>
                            <Box>New</Box>
                            <Box>Sale</Box>
                            <Box>In Stock</Box>
                        </Box>
                        <Container className={classes.postsContainer}>
                            {data.map((post) => (
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
