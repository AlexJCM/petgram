import { useEffect, useState, useRef } from "react";

export function useNearScreen() {
  const element = useRef(null); //coge la referencia del elemento en el DOM
  const [show, setShow] = useState(false);

  //Crearemos un Lazy Loader con este hook
  useEffect(
    function() {
      //Primero cargaremos el polifill siempre y cuando el navegador no lo tenga
      Promise.resolve(
        typeof window.IntersectionObserver !== "undefined"
          ? window.IntersectionObserver
          : import("intersection-observer") //import dinamico
      ).then(() => {
        const observer = new window.IntersectionObserver(function(entries) {
          // console.log("entries: ", entries);
          const { isIntersecting } = entries[0];
          //console.log("isIntersecting: ", isIntersecting);
          if (isIntersecting) {
            setShow(true); //ayuda a mostrar el componente
            observer.disconnect(); //evita que el observador se vuelva a conectar
          }
        });
        observer.observe(element.current); //le pasamos el elemento que queremos observar
      });
    },
    [element]
  );

  return [show, element];
}
