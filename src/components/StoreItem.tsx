import { Card, Button } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoopingContext } from "../context/ShoppingContext";
interface StoreItemsProps {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

export const StoreItem = ({ id, name, price, imgUrl }: StoreItemsProps) => {
  const {
    getItemQuantity,
    incrementCartQuantity,
    decrementCartQuantity,
    removeFromCart
  } = useShoopingContext();
  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant=" top"
        height="200px"
        style={{ objectFit: "cover" }}
        src={imgUrl}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => incrementCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decrementCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => incrementCartQuantity(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
