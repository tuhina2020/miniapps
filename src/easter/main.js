import Container from "./container";
import "@/style/main.css"
import configureStore from './store/configureStore'
import { blankPage } from "../utils";
const store = configureStore();
const container = new Container({ store });
container.getData().then(()=> {
	container.registerComponents();
	container.render();
});

// store.subscribe(() => {
// 	console.log('CHANGE ', store.getState());
// 	container.render();
// })