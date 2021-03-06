import {AppBar, Button, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import React, {Fragment} from "react";
import {NavLink} from "react-router-dom"
import Box from "@material-ui/core/Box";
import {useSelector} from "react-redux";
import * as basketDuck from "../../../features/feature/ducks/basket.duck";
import {withStyles} from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import {selectItemsCosts, selectItemsValue} from "../../../features/feature/ducks/basket.duck";


const useStyles = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

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

export function Header() {
    const useMyStyles = makeStyles((theme) => {
        return {
            header: {
                marginBottom: theme.spacing(2)
            }
        }
    })
    const items = useSelector(basketDuck.selectItemsValue);

    const myStyles = useMyStyles();

    const classes = useStyles();
    return (
        <Fragment>
            <div className={classes.offset}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Shopping
                        </Typography>
                        <Box>
                            {/*<NavLink to="/" exact>Home Page</NavLink>*/}
                            <Button color='inherit' to="/" exact component={NavLink}>Home Page</Button>
                            <Button color='inherit' to="/about-us" exact component={NavLink}>About</Button>
                            <Button color='inherit' to="/delivery&price" exact component={NavLink}>Delivery &
                                Price</Button>
                            <Button color='inherit' to="/catalog" exact component={NavLink}>Catalog Page</Button>
                            <Button to="/cart" exact component={NavLink}>Basket</Button>
                            {items > 0 &&
                            <IconButton aria-label="cart" to="/cart" exact component={NavLink}>
                                <StyledBadge badgeContent={items} color="primary">
                                    <ShoppingCartIcon/>
                                </StyledBadge>
                            </IconButton>
                            }
                        </Box>
                    </Toolbar>
                </AppBar>
            </div>
        </Fragment>
    )
}