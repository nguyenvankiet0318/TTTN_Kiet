package com.webtttn.exercise03.service;

import java.util.List;
import java.util.UUID;

import com.webtttn.exercise03.entity.OrderProd;

public interface OrderprodService {
    OrderProd addOrderProd(OrderProd OrderProd);

    OrderProd getOrderProdById(UUID OrderProdId);

    List<OrderProd> getAllOrderProds();

    OrderProd updateOrderProd(UUID OrderProdId, OrderProd updatedOrderProd);

    void deleteOrderProd(UUID OrderProdId);
}
