import Categories from "./components/Cetegories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";

import pizzas from "./db";

import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories
              categories={[
                "Всі",
                "М'ясні",
                "Веґетаріанські",
                "Ґриль",
                "Гострі",
                "Закриті",
              ]}
            />

            <Sort sort={["популярністю", "ціною", "абеткою"]} />
          </div>
          <h2 className="content__title">Всі піци</h2>
          <div className="content__items">
            {pizzas.map((item, index) => {
              return (
                <PizzaBlock
                  key={`${String(item.id)}_${index}`}
                  title={item.title}
                  price={item.price}
                  src={item.src}
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
