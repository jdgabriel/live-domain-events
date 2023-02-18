import { Order } from "../bounded-contexts/sales/order";
import { OrderCreatedEvent } from "../bounded-contexts/sales/order-created";
import { OrderPaidEvent } from "../bounded-contexts/sales/order-paid-event";
import { DomainEvents } from "../core/DomainEvents";

// Subscribe
DomainEvents.registerSubscriber(
  OrderCreatedEvent.name,
  () => {
    console.log('order created')
  }
)

DomainEvents.registerSubscriber(
  OrderPaidEvent.name,
  () => {
    console.log('order paid')
  }
)

// Publisher
const order = Order.create({
  customerId: "costumer_1",
  productId: "product_1",
  amountInCents: 5000,
  status: 'pending',
  createdAt: new Date(),
})

order.pay()

// Finally
// Save on database
DomainEvents.dispatchEventsForEntity(order.id)