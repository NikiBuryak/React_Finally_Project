import {featureConf} from "./config";

import {AboutUsPage} from "./pages/AboutUsPage";
import {CatalogPage} from "./pages/CatalogPage";
import {ProductPage} from "./pages/ProductPage";
import {DeliveryAndPricePage} from "./pages/DeliveryAndPricePage";
import {HomePage} from "./pages/HomePage";

export const routes = [
    {
        key: `${featureConf}/home`,
        path: '/',
        component: HomePage,
        exact: true,
    },
    {
        key: `${featureConf}/home`,
        path: '/about-us/',
        component: AboutUsPage,
        exact: true,
    },
    {
        key: `${featureConf}/home`,
        path: '/catalog/',
        component: CatalogPage,
        exact: true,
    },
    {
        key: `${featureConf}/home`,
        path: '/catalog/:id/',
        component: ProductPage,
        exact: true,
    },
    {
        key: `${featureConf}/home`,
        path: '/delivery&price/',
        component: DeliveryAndPricePage,
        exact: true,
    },

];
