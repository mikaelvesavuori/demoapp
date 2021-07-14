import React from 'react';
import PropTypes from "prop-types";

import { Header, Footer, ProductCard, CartButton } from '@mikaelvesavuori/acmecorp-potted-plants-components';

import productData from '../../data.json';

export const ProductsView = ({ itemCount, addItemToCart }) => {
  const products = productData ? productData.products.map(product => {
    const { imageUrl, heading, description, price, id} = product;
    return (
      <ProductCard
        imageUrl={imageUrl}
        heading={heading}
        description={description}
        price={parseInt(price)}
        id={id}
        addItemToCart={(e) => addItemToCart(e)}
        key={id} />
    )
  }) : null;

  return (
    <>
      <main id="products">
        <Header>Products</Header>

        <div style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap"
        }}>
        {products}
        </div>

        <CartButton itemCount={itemCount} />
      </main>
      <Footer>The ACME Corp. Potted Plants store</Footer>
    </>
  )
}

ProductsView.default = {
  itemCount: 0
};

ProductsView.propTypes = {
  itemCount: PropTypes.number.isRequired,
	addItemToCart: PropTypes.func.isRequired
};