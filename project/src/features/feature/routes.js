import {featureConf} from "./config";

import {AboutUsPage} from "./pages/AboutUsPage";
import {CatalogPage} from "./pages/CatalogPage";
import {ProductPage} from "./pages/ProductPage";
import {StorePage} from "./pages/StorePage";
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
        key: `${featureConf}/about-us`,
        path: '/about-us/',
        component: AboutUsPage,
        exact: true,
    },
    {
        key: `${featureConf}/catalog`,
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
        key: `${featureConf}/delivery&prices`,
        path: '/delivery&price/',
        component: DeliveryAndPricePage,
        exact: true,
    },
    {
        key: `${featureConf}/store`,
        path: '/cart',
        component: StorePage,
        exact: true,
    },

];
