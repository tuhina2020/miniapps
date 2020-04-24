import Container from "./container";
import "@/styles/main.css";
import "@/styles/normalize.css";

import configureStore from '@/common/store/configureStore'
const store = configureStore();
const container = new Container({ store });
container.getData().then(()=> {
	container.render();
});