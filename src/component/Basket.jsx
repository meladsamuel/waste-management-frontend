import React, { useRef } from 'react';
import { ListGroupItem, Button, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { useDelete, useUpdateDevice } from '../api';

const Basket = ({ data, onDeleted }) => {
  const version = useRef();
  const { isPending: deletingBasket, deleteItem } = useDelete('baskets', onDeleted);
  const { update } = useUpdateDevice(`baskets/${data.id}/update`);
  const handleSubmit = (event, id) => {
    event.preventDefault();
    update(id, version.current.value);
  };
  return (
    <ListGroupItem key={data.id}>
      <p>
        basket {data.id} {'=>'} {data.level}
      </p>
      <ButtonGroup>
        <Button variant="danger" onClick={() => deleteItem(data.id)}>
          {deletingBasket ? 'deleting Basket...' : 'delete basket'}
        </Button>{' '}
        <form onSubmit={(event) => handleSubmit(event, data.id)}>
          <TextField inputRef={version} />
          <Button type="submit">update software</Button>
        </form>
      </ButtonGroup>
    </ListGroupItem>
  );
};

Basket.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  onDeleted: PropTypes.func.isRequired,
};

export default Basket;
