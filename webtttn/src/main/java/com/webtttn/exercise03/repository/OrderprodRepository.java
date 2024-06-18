package com.webtttn.exercise03.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webtttn.exercise03.entity.OrderProd;

import java.util.UUID;

@Repository
public interface OrderprodRepository extends JpaRepository<OrderProd, UUID> {
}
