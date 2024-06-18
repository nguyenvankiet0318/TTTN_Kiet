package com.webtttn.exercise03.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webtttn.exercise03.entity.OrderProd;
import com.webtttn.exercise03.repository.OrderprodRepository;
import com.webtttn.exercise03.service.OrderprodService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderprodServiceImpl implements OrderprodService {

    @Autowired
    private OrderprodRepository OrderProdRepository;

    @Override
    public OrderProd addOrderProd(OrderProd OrderProd) {
        return OrderProdRepository.save(OrderProd);
    }

    @Override
    public OrderProd getOrderProdById(UUID OrderProdId) {
        Optional<OrderProd> optionalOrderProd = OrderProdRepository.findById(OrderProdId);
        return optionalOrderProd.orElse(null);
    }

    @Override
    public List<OrderProd> getAllOrderProds() {
        return OrderProdRepository.findAll();
    }

    @Override
    public OrderProd updateOrderProd(UUID OrderProdId, OrderProd updatedOrderProd) {
        OrderProd existingOrderProd = OrderProdRepository.findById(OrderProdId).orElse(null);

        if (existingOrderProd != null) {
            existingOrderProd.setProduct(updatedOrderProd.getProduct());
            existingOrderProd.setOrder(updatedOrderProd.getOrder());
            existingOrderProd.setPrice(updatedOrderProd.getPrice());
            existingOrderProd.setQuantity(updatedOrderProd.getQuantity());
            existingOrderProd.setShippingId(updatedOrderProd.getShippingId());
            return OrderProdRepository.save(existingOrderProd);
        }

        return null;
    }

    @Override
    public void deleteOrderProd(UUID OrderProdId) {
        OrderProdRepository.deleteById(OrderProdId);
    }
}
