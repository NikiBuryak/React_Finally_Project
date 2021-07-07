import React from 'react';
import {useQuery} from 'react-query'
import {getCatalog} from "../api/ProductsAPI";
import Box from "@material-ui/core/Box";
import {Container, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    postContainer: {
        marginBottom: theme.spacing(5),
    },
}));

export function CatalogPage() {

    const customStyles = useStyles();

    const {data, error, isLoading} = useQuery('catalog', async () => {
        const {data} = await getCatalog()
        return data;
    });
    return (
        <div className="page">
            {isLoading ? <div>Lading...</div>
                : error ? <div>Error : {error}</div>
                    : <div>
                        {data.map((post) => (
                            <Container className={customStyles.postContainer} key={post.id}>
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
                                <div>Categories:
                                    {post.categories.map((category) => <span key={category}>{category},</span>)}
                                </div>
                                <Box display="flex">
                                    {post.isInStock &&
                                    <Typography variant="h6" mr={2} color="error">IN STOCK!!!</Typography>}
                                    {post.isNew && <Typography variant="h6" color="error">NEW!!!</Typography>}
                                    {post.isSale && <Typography variant="h6" color="error">ON SALE!!!</Typography>}
                                </Box>
                                <p>Price : {post.price}</p>
                                <img src={post.photo}/>
                                <Typography variant="h6" color='inherit'>Rating : {post.rating}</Typography>
                            </Container>
                        ))}
                    </div>
            }
        </div>
    );
}

CatalogPage.propTypes = {};