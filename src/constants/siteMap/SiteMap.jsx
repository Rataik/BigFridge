import { Page as homePage } from './page/home/home';
import { Page as listPage } from './page/list/list';
import { Page as quantityPage } from './page/quantity/quantity';

const siteMapPages = [homePage, listPage, quantityPage];
const Pages = siteMapPages.sort((p1, p2) => p1.order - p2.order);

export default Pages;
