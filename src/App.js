import Categories from "./components/Cetegories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";

import pizzas from "./state/pizzas";
import categories from "./state/categories";
import sort from "./state/sort";

import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories categories={categories} />
            <Sort sort={sort} />
          </div>
          <h2 className="content__title">Всі піци</h2>
          <div className="content__items">
            {pizzas.map((item, index) => {
              return (
                <PizzaBlock
                  key={`${item.id}_${index}`}
                  title={item.title}
                  price={item.price}
                  src={item.image}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
