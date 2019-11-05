import React, { Fragment, useEffect, useState } from "react";
import { Category } from "../Category";
import { List, Item } from "./styles";
import { Spinner } from "../Spinner";

//Custom hook
function useCategoriesData() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(function() {
    setLoading(true);
    window
      .fetch("https://petgram-api-alex.now.sh/categories")
      .then(res => res.json())
      .then(response => {
        setCategories(response);
        setLoading(false);
      });
  }, []); //el array vacio indica que solo se ejecutara una vez este hook

  return { categories, loading };
}

export const ListOfCategories = () => {
  const { categories, loading } = useCategoriesData();
  const [showFixed, setShowFixed] = useState(false);

  //Muestra las categorias fijas cuando se hace escroll para abajo
  useEffect(
    function() {
      const onScroll = e => {
        const newShowFixed = window.scrollY > 200;
        showFixed !== newShowFixed && setShowFixed(newShowFixed);
      };

      document.addEventListener("scroll", onScroll);

      // limpia el evento cada vez que se vuelva ejecutar
      return () => document.removeEventListener("scroll", onScroll);
    },
    [showFixed]
  );

  const renderList = fixed => (
    <List fixed={fixed}>
      {loading ? (
        <Item key="loading">
          <Spinner />
        </Item>
      ) : (
        categories.map(category => (
          <Item key={category.id}>
            <Category {...category} />
          </Item>
        ))
      )}
    </List>
  );

  return (
    <Fragment>
      {renderList()}
      {showFixed && renderList(true)}
    </Fragment>
  );
};
// ...category
// es similar a:
// cover={category.cover} emoji={category.emoji}
