package com.beit.aquint.master.customer.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.master.customer.entity.Customer;
import com.beit.aquint.master.customer.repository.CustomerRepository;
import com.beit.aquint.master.customer.service.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    @Override
    public ResponseMessage addNewCustomer(Customer customer) throws AquintCommonException {
        try {
            return new ResponseMessage("Customer saved/updated successfully", customerRepository.save(customer));
        } catch (Exception exception) {
            throw new AquintCommonException("Customer Not Saved Properly");
        }
    }

    @Override
    public List<Customer> getAllCustomer() throws AquintCommonException {

        try {
            return customerRepository.findAll();
        } catch (Exception exception) {
            throw new AquintCommonException("Customer Not Saved Properly");
        }        }

    @Override
    public Customer getCustomerByID(Long id) throws AquintCommonException {
        try {
            return customerRepository.findCustomerById(id);
        } catch (Exception exception) {
            throw new AquintCommonException("Customer Not fetched Properly");
        }       }
}
