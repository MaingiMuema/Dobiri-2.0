import { Grid, Spinner, VStack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Header";
import useFetch from "./hooks";
import Items from "./Items";
import Data from "../Data/bag.json";

export default function Groceries() {
  const [query, setQuery] = useState("");
  const [sortdata, setSortdata] = useState("");
  const [page, setPage] = useState(1);
  let url = `https://localhost:5000/products?page=${page}&category=bag&sort=${sortdata}`;
  let { loading, error, list } = useFetch(query, page, url);
  const loader = useRef(null);
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  if (query) {
    Data = Data.filter((elem) => elem.category === query);
  }
  if (sortdata === "LTH") {
    Data = Data.sort((a, b) => a.price - b.price);
  } else if (sortdata === "HTL") {
    Data = Data.sort((a, b) => b.price - a.price);
  } else {
    Data = Data;
  }
  return (
    <>
      <Header title="Groceries" setQuery={setQuery} setSortdata={setSortdata} />
      <Grid
        templateColumns={{
          lg: "repeat(4, 1fr)",
          md: "repeat(3,1fr)",
          base: "repeat(1,1fr)",
        }}
        gap={6}
        p="0 2rem"
      >
        {Data.map((elem) => {
          return <Items key={elem._id} data={elem} />;
        })}
        <div ref={loader} />
      </Grid>
      {loading && (
        <VStack
          w="100%"
          minH="500px"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </VStack>
      )}
      {error && <p>Error!</p>}
    </>
  );
}
