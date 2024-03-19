package com.beit.aquint.master.customer.service;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.master.customer.entity.Customer;
import com.beit.aquint.master.vendor.entity.Vendor;

import java.util.List;

public interface CustomerService {

    public ResponseMessage addNewCustomer(Customer customer) throws AquintCommonException;

    public List<Customer> getAllCustomer() throws AquintCommonException;

    public Customer getCustomerByID(Long id) throws AquintCommonException;

}
