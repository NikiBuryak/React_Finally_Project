import React, {useEffect, useRef, useState} from "react";
import Box from "@material-ui/core/Box";
import {useQuery} from "react-query";
import {get, getCatalog} from "../api/ProductsAPI";
import {useSelector, useDispatch} from "react-redux";
import * as basketDuck from "../ducks/basket.duck";
import {selectItems} from "../ducks/basket.duck";
import {Button, Container, Typography} from "@material-ui/core";


export function StorePage() {
    const dispatch = useDispatch();
    const [basketlist, setBasketList] = useState([]);
    const [itemValues, setItemValues] = useState([]);

    let amountRef = useRef(null);
    let deleteRef = useRef(null);

    let items = useSelector(basketDuck.selectItems);
    items = items.filter((item) => !!item.id);

    let summaryValue = useSelector(basketDuck.selectItemsValue);
    let summaryCosts = useSelector(basketDuck.selectItemsCosts);



    const {data, error, isLoading} = useQuery('cataloglist', async () => {
        const {data} = await getCatalog()
        return data;
    });

    useEffect(() => {
        setBasketList(data && data.filter(({id}) => items.find(el => el.id === id)));
        setItemValues(items);
    }, []);

    const handleDeleteClick = (id, price) => {
        let deleteNumb = null;
        if (deleteRef.value > 0) {
            deleteNumb = deleteRef.value;
        } else {
            deleteNumb = 1;
        }
        setItemValues([...items]);
        dispatch(basketDuck.removeItem(id, {deleteNumb, price}));
    }

    const handleChangeValue = (price, id, newValue) => {
        dispatch(basketDuck.updateItem(id, {price, newValue}));
        let newValues = items.filter(el => el.id !== id);
        newValues.push({id, value: newValue});
        setItemValues([...newValues]);
    }
    const calcSummary = (price, id) => {
        const item = items && items.find(el => el.id === id);
        return item ? price * item.value : '0';
    }

    const findMyValue = (id) => {
        return items && items.find(el => el.id === id).value

    }
    const handleSubmitClick = ()=>{
        console.log("submit")
    }
    return (
        <Box display={"flex"} flexWrap={'wrap'} justifyContent={"space-evenly"}>
            {isLoading ? <div>Loading...</div> :
                error ? <div>Error : {error}</div> :
                    basketlist && basketlist.length > 0 ? basketlist.map((data) => (

                            <Box maxWidth={'400px'} key={data.id}  border={"2px solid #66bb6a87"} >
                                <img width= '100%' src={data.photo}/>
                                <Typography className={data.productText} variant="h6">{data.title}</Typography>
                                <p>Price : {data.price}</p>
                                <p>Amount : {findMyValue(data.id)}</p>
                                <Box display={"flex"} alignItems={'center'}>
                                    <label>Change amount <input type="number"
                                                                ref={(input) => amountRef = input}></input>
                                    </label>
                                    <Button
                                        onClick={() => handleChangeValue(data.price, data.id, amountRef.value)}>Change</Button>
                                </Box>

                                <p>Summary price : {calcSummary(data.price, data.id)} Rubik</p>


                                <Box display={'flex'} alignItems={'center'}>
                                    <label>Amount<input type="number" ref={(input) => deleteRef = input}></input>></label>
                                    <Button onClick={() => handleDeleteClick(data.id, data.price)}>Delete</Button>
                                </Box>

                            </Box>
                        )

                        )
                        : <div>Empty basket</div>
            }
            {basketlist && basketlist.length > 0 && <Box mt={10} display='flex' width="100vw" flexDirection="column" alignItems="center">
                <Typography variant="h6">Summary : {summaryValue} items</Typography>
                <Typography variant="h6">Summary price : {summaryCosts} Rubik</Typography>
                <Button variant={"outlined"} onClick={handleSubmitClick}>Submit</Button>
            </Box>
            }
        </Box>
    )
}