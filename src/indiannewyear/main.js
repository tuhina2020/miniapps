import Container from "./container";
import configureStore from '@/common/store/configureStore'
const store = configureStore();
const container = new Container({ store });
container.getData().then(()=> {
	container.registerComponents();
	container.render();
});