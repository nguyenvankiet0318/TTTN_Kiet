package com.webtttn.exercise03.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.webtttn.exercise03.entity.OrderProd;
import com.webtttn.exercise03.service.OrderprodService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/order-items")
public class OrderrodController {

    @Autowired
    private OrderprodService OrderProdService;

    @GetMapping
    public ResponseEntity<List<OrderProd>> getAllOrderProds() {
        List<OrderProd> OrderProds = OrderProdService.getAllOrderProds();
        return ResponseEntity.ok(OrderProds);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderProd> getOrderProdById(@PathVariable("id") UUID OrderProdId) {
        OrderProd OrderProd = OrderProdService.getOrderProdById(OrderProdId);
        if (OrderProd != null) {
            return ResponseEntity.ok(OrderProd);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<OrderProd> addOrderProd(@RequestBody OrderProd OrderProd) {
        OrderProd addedOrderProd = OrderProdService.addOrderProd(OrderProd);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedOrderProd);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderProd> updateOrderProd(@PathVariable("id") UUID OrderProdId,
            @RequestBody OrderProd updatedOrderProd) {
        OrderProd OrderProd = OrderProdService.updateOrderProd(OrderProdId, updatedOrderProd);
        if (OrderProd != null) {
            return ResponseEntity.ok(OrderProd);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderProd(@PathVariable("id") UUID OrderProdId) {
        OrderProdService.deleteOrderProd(OrderProdId);
        return ResponseEntity.noContent().build();
    }
}
