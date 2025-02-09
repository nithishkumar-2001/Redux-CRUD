import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/productsSlice';
import { useNavigate } from 'react-router-dom';
import { Button, ListGroup, Spinner, Alert } from 'react-bootstrap';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleUpdate = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <h1>Details</h1>
      {status === 'loading' && (
        <Spinner animation="border" variant="primary" />
      )}
      {status === 'failed' && (
        <Alert variant="danger">Error loading products</Alert>
      )}
      <ListGroup>
        {products.map((product) => (
          <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
            <span>
              Name: {product.name}   </span><span> Age:{product.price}</span> 
             
         
            <div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(product.id)}
                className="me-2"
              >
                Delete
              </Button>
              <Button
                variant="warning"
                size='sm'
                className="me-2"
                onClick={() => handleUpdate(product.id)}>Update</Button>

            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ProductList;