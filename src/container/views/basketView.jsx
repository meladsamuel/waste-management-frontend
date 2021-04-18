import React, { useRef } from 'react';
import {
  ListGroup,
  ButtonGroup,
  Container,
  Form,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { useGet, useCreate, usePublish } from '../../api';
import Basket from '../../component/Basket';

const baseketData = {
  area_code: 11,
  longitude: 31.61935200153116,
  latitude: 30.156294475301895,
};

const BasketView = () => {
  const msg = useRef();
  const { payload: baskets, isPending: basketLoading, getAll } = useGet('baskets');
  const { create: createBasket, isPending: creatingBasket } = useCreate(
    'baskets',
    getAll
  );
  const { isPending: publishing, publish } = usePublish('pub/sensor');
  const submiting = (e) => {
    e.preventDefault();
    publish(msg.current.value);
    msg.current.value = '';
  };
  return (
    <Container>
      <Form onSubmit={submiting}>
        <InputGroup>
          <FormControl
            ref={msg}
            className="mb-3"
            type="text"
            placeholder="your message"
          />
          <InputGroup.Append>
            <Button type="submit" variant="outline-secondary">
              {publishing ? 'publishing...' : 'Publish'}
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <br />
      <ListGroup>
        {baskets &&
          baskets.baskets.map((item) => (
            <Basket key={item.id} data={item} onDeleted={getAll} />
          ))}
      </ListGroup>
      <ButtonGroup size="lg" className="mb-2">
        <Button onClick={getAll}>
          {basketLoading ? 'loading...' : 'Get All Baskets'}
        </Button>
        <Button onClick={() => createBasket(baseketData)}>
          {creatingBasket ? 'creating basket...' : 'Create new Basket'}
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default BasketView;
