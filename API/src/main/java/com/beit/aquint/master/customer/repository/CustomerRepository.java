package com.beit.aquint.master.customer.repository;

import com.beit.aquint.master.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findCustomerById(Long id);

}
